import React from 'react';
import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';
import {BUTTON_TYPE, QRType, RoutesPath, SocialType, TOAST_SEVERITY} from '../../../libs/constants';
import {IInput} from '../../form/Input';
import {QRInput} from '../../../libs/schemas/qr.schema';
import VCardForm from './VCardForm';
import MediaForm from './MediaForm';
import CustomRadioButton from '../../form/CustomRadioButton';
import Button from '../../form/Button';
import {useAppDispatch} from '../../../store';
import {openSnackbar} from '../../../reducers/appSlice';
import {HTTPResponseError} from '../../../utils/error';
import {useCreateQrMutation, useUpdateQrMutation} from '../../../reducers/qrSlice';
import {useNavigate} from 'react-router-dom';
import FullPageBackdrop from '../../shared/FullPageBackdrop';
import {Employee, Media, QR, Social} from '../../../libs/models/qr';
import VCardPreview from './VCardPreview';
import MediaPreview from './MediaPreview';
import LoadingSpinner from "../../shared/LoadingSpinner";
import SocialForm from "./SocialForm";
import SocialPreview from "./SocialPreview";

interface QRCodeFormProps {
  initialData?: Partial<QR>;
  isEdit?: boolean
}

const QrCoreForm: React.FC<QRCodeFormProps> = ({ initialData, isEdit = false }) => {
  console.log(initialData);
  const dispatch = useAppDispatch();
  const { register, watch, formState: { errors }, handleSubmit, control } = useForm<QRInput>({
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
        file: (initialData?.data as Employee)?.media?.key || undefined,
      },
      media: {
        company: (initialData?.data as Media)?.company || '',
        title: (initialData?.data as Media)?.title || '',
        description: (initialData?.data as Media)?.description || '',
        file: (initialData?.data as Media)?.media?.key || undefined,
      },
      social: {
        title: (initialData?.data as Social)?.title || '',
        description: (initialData?.data as Social)?.description || '',
        socialMedia: (initialData?.data as Social)?.socialMedia || [{ text: 'Visit us online', url: 'www.your-website.com', type: SocialType.WEBSITE }],
        file: (initialData?.data as Social)?.media?.key || undefined,
      }
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "social.socialMedia",
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
        formData.append("data", data.vCard?.file[0] as Blob);
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
      if(data.qrType === QRType.SOCIAL) {
        formData.append("data", data.social?.file[0] as Blob);
        formData.append("data[title]", data.social?.title as string);
        formData.append("data[description]", data.social?.description as string);
        data.social?.socialMedia.forEach((item, index) => {
          formData.append(`data[socialMedia][${index}][text]`, item.text);
          formData.append(`data[socialMedia][${index}][url]`, item.url);
          formData.append(`data[socialMedia][${index}][type]`, item.type);
        });
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
      <div className='flex gap-2'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-white w-full p-8 rounded-md flex-1'>
          <IInput
            register={register}
            id="qrName"
            label="QR Name"
            placeHolder="Name your QR Code"
            name="qrName"
            required={true}
            error={errors.qrName?.message || ""}
          />

          {
            !isEdit && <div>
              <label>QR Type:</label>
              <div className={`flex gap-4`}>
                <CustomRadioButton qrType={qrType} register={register} label="Website" value={QRType.WEBSITE} />
                <CustomRadioButton qrType={qrType} register={register} label="V_Card" value={QRType.V_CARD} />
                <CustomRadioButton qrType={qrType} register={register} label="PDF" value={QRType.PDF} />
                <CustomRadioButton qrType={qrType} register={register} label="Image" value={QRType.IMAGE} />
                <CustomRadioButton qrType={qrType} register={register} label="Social" value={QRType.SOCIAL} />
              </div>
              {errors.qrType && <p>{errors.qrType.message}</p>}
            </div>
          }
          <hr className='mt-4' />
          {qrType === QRType.WEBSITE && (
            <IInput
              register={register}
              id="websiteLink"
              label="Website Link"
              placeHolder="Enter your website link"
              name="websiteLink"
              required={true}
              error={errors.websiteLink?.message || ""}
            />
          )}

          {qrType === QRType.V_CARD && (
            <VCardForm register={register} errors={errors} />
          )}

          {(qrType === QRType.PDF || qrType === QRType.IMAGE) && (
            <MediaForm errors={errors} register={register} />
          )}
          {(qrType === QRType.SOCIAL) && (
              <SocialForm onAppend={append} onRemove={remove} fields={fields} errors={errors} register={register} />
          )}
          <div className="mt-2">
            <Button label='Submit' type={BUTTON_TYPE.SUBMIT} blocked />
          </div>
        </form>

        <div className='flex-1'>
          {
            watchFields.qrType === QRType.V_CARD &&
            <VCardPreview
              employee={{
                firstName: watchFields.vCard?.firstName as string,
                lastName: watchFields.vCard?.lastName as string,
                address: watchFields.vCard?.address as string,
                company: watchFields.vCard?.company as string,
                email: watchFields.vCard?.email as string,
                job: watchFields.vCard?.job as string,
                phone: watchFields.vCard?.phone as string,
                summary: watchFields.vCard?.summary as string,
                media: !!initialData ? (initialData.data as Media).media : { key: "", url: "" }
              }}
              file={!!watchFields.vCard?.file ? watchFields.vCard.file[0] : null}
            />
          }
          {
            (watchFields.qrType === QRType.PDF || watchFields.qrType === QRType.IMAGE) &&
            <MediaPreview
              qrCode={null}
              data={{
                company: watchFields.media?.company as string,
                title: watchFields.media?.title as string,
                description: watchFields.media?.description as string,
                media: !!initialData ? (initialData.data as Media).media : { key: "", url: "" }
              }}
              file={!!watchFields.media?.file ? watchFields.media.file[0] : null}
              qrType={watchFields.qrType}
            />
          }
          {
            watchFields.qrType === QRType.SOCIAL &&
            <SocialPreview
                social={{
                    socialMedia: watchFields.social.socialMedia,
                    title: watchFields.social.title,
                    description: watchFields.social.description,
                    media: !!initialData ? (initialData.data as Social).media : { key: "", url: "" }
                }}
                file={!!watchFields.social?.file ? watchFields.social.file[0] : null}
            />
          }
        </div>
      </div>
    </>
  );
};

export default QrCoreForm;
