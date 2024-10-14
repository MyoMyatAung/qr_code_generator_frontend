import { useParams } from 'react-router-dom';
import QrCoreForm from '../../components/features/qr/QrCoreForm'
import { useChangeAppTitle } from '../../hooks/useChangeAppTitle';
import { useGetQrByIdQuery } from '../../reducers/qrSlice';
import FullPageBackdrop from '../../components/shared/FullPageBackdrop';
import loading from "../../assets/loading.json";
import Lottie from 'lottie-react';

export type MyParams = {
  id: string;
};

const EditQrPage = () => {
  useChangeAppTitle("Edit QR");
  let { id } = useParams<keyof MyParams>() as MyParams;
  const { data, isError, isLoading, isSuccess } = useGetQrByIdQuery(id);

  let content;
  if (isLoading) {
    content = <FullPageBackdrop>
      <Lottie animationData={loading} loop={true} width={10} height={10} />
    </FullPageBackdrop>
  }
  if (isError) {
    content = <>Error loading QR Code.</>
  }
  if (isSuccess) {
    const { data: qrData } = data;
    content = <QrCoreForm initialData={qrData} isEdit />
  }
  return (
    <>{content}</>
  )
}

export default EditQrPage