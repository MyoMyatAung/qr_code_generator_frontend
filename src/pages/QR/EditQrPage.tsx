import { useParams } from 'react-router-dom';
import QrCoreForm from '../../components/features/qr/QrCoreForm'
import { useChangeAppTitle } from '../../hooks/useChangeAppTitle';
import { useGetQrByIdQuery } from '../../reducers/qrSlice';
import FullPageBackdrop from '../../components/shared/FullPageBackdrop';
import LoadingSpinner from "../../components/shared/LoadingSpinner";

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
      <LoadingSpinner />
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