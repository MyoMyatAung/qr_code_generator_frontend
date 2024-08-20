import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BUTTON_TYPE, QRType, RoutesPath, TOAST_SEVERITY } from '../../../libs/constants';
import { IInput } from '../../form/Input';
import { QRInput } from '../../../libs/schemas/qr.schema';
import VCardForm from './VCardForm';
import MediaForm from './MediaForm';
import CustomRadioButton from '../../form/CustomRadioButton';
import Button from '../../form/Button';
import { useAppDispatch } from '../../../store';
import { openSnackbar } from '../../../reducers/appSlice';
import { HTTPResponseError } from '../../../utils/error';
import { useCreateQrMutation, useUpdateQrMutation } from '../../../reducers/qrSlice';
import { useNavigate } from 'react-router-dom';
import FullPageBackdrop from '../../shared/FullPageBackdrop';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Employee, Media, QR } from '../../../libs/models/qr';

interface QRCodeFormProps {
  initialData?: Partial<QR>;
}

const QrCoreForm: React.FC<QRCodeFormProps> = ({ initialData }) => {
  const dispatch = useAppDispatch();
  const { register, watch, formState: { errors }, handleSubmit } = useForm<QRInput>({
    defaultValues: {
      qrName: initialData?.qrName || '',
      qrType: initialData?.type || QRType.WEBSITE,
      websiteLink: initialData?.data as string || '',
      vCard: {
        firstName: (initialData?.data as Employee)?.firstName || '',
        lastName: (initialData?.data as Employee)?.lastName || '',
        phone: (initialData?.data as Employee)?.phone || '',
        email: (initialData?.data as Employee)?.email || '',
        company: (initialData?.data as Employee)?.company || '',
        job: (initialData?.data as Employee)?.job || '',
        address: (initialData?.data as Employee)?.address || '',
        summary: (initialData?.data as Employee)?.summary || '',
      },
      media: {
        company: (initialData?.data as Media)?.company || '',
        title: (initialData?.data as Media)?.title || '',
        description: (initialData?.data as Media)?.description || '',
        file: (initialData?.data as Media)?.media?.key || undefined, // Fix file assignment
      },
    },
  });
  const navigate = useNavigate();

  const qrType = watch('qrType');
  const watchFields = watch(); // Watch all fields

  const [createQr, { isLoading: createLoading }] = useCreateQrMutation();
  const [updateQr, { isLoading: updateLoading }] = useUpdateQrMutation();


  const onSubmit: SubmitHandler<QRInput> = async (data) => {
    const formData = new FormData();
    try {

      formData.append("qrName", data.qrName);
      formData.append("type", data.qrType);
      if (data.qrType === QRType.WEBSITE) {
        formData.append("data", data.websiteLink as string);
      }
      if (data.qrType === QRType.V_CARD) {
        formData.append("data[firstName]", data.vCard?.firstName as string);
        formData.append("data[lastName]", data.vCard?.lastName as string);
        formData.append("data[phone]", data.vCard?.phone as string);
        formData.append("data[email]", data.vCard?.email as string);
        formData.append("data[company]", data.vCard?.company as string);
        formData.append("data[job]", data.vCard?.job as string);
        formData.append("data[address]", data.vCard?.address as string);
        formData.append("data[summary]", data.vCard?.summary as string);
      }
      if (data.qrType === QRType.IMAGE || data.qrType === QRType.PDF) {
        formData.append("data", data.media?.file[0] as Blob);
        formData.append("data[company]", data.media?.company as string);
        formData.append("data[title]", data.media?.title as string);
        formData.append("data[description]", data.media?.description as string);
      }

      if (!!initialData) {
        // Update
        await updateQr({ id: initialData._id as string, data: formData }).unwrap();
        dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: "Successfully updated QR code!" }));
      } else {
        // Create
        await createQr(formData).unwrap();
        dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: "Successfully created QR code!" }));
      }
    } catch (error) {
      const customError = HTTPResponseError.fromResponse(error);
      dispatch(openSnackbar({ severity: TOAST_SEVERITY.ERROR, message: customError.message }));
    } finally {
      navigate(`/${RoutesPath.ALL}`);
    }
  }

  let loadingContent;
  if (createLoading || updateLoading) {
    loadingContent = <FullPageBackdrop>
      <LoadingSpinner />
    </FullPageBackdrop>
  }

  return (
    <>
      {loadingContent}
      <div className='flex gap-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-full p-8 rounded-md'>
          <IInput
            register={register}
            id="qrName"
            label="QR Name"
            placeHolder="Name your QR Code"
            name="qrName"
            required
            error={errors.qrName?.message || ""}
          />

          <div>
            <label>QR Type:</label>
            <div className='flex gap-4'>
              <CustomRadioButton qrType={qrType} register={register} label="Website" value={QRType.WEBSITE} />
              <CustomRadioButton qrType={qrType} register={register} label="V_Card" value={QRType.V_CARD} />
              <CustomRadioButton qrType={qrType} register={register} label="PDF" value={QRType.PDF} />
              <CustomRadioButton qrType={qrType} register={register} label="Image" value={QRType.IMAGE} />

            </div>
            {errors.qrType && <p>{errors.qrType.message}</p>}
          </div>

          {qrType === QRType.WEBSITE && (
            <IInput
              register={register}
              id="websiteLink"
              label="Website Link"
              placeHolder="Enter your website link"
              name="websiteLink"
              required
              error={errors.websiteLink?.message || ""}
            />
          )}

          {qrType === QRType.V_CARD && (
            <VCardForm register={register} errors={errors} />
          )}

          {(qrType === QRType.PDF || qrType === QRType.IMAGE) && (
            <MediaForm errors={errors} register={register} />
          )}
          <div className="mt-2">
            <Button label='Submit' type={BUTTON_TYPE.SUBMIT} blocked />
          </div>
        </form>

        <div>
          <h2>Preview</h2>
          <pre>{JSON.stringify(watchFields, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default QrCoreForm;
