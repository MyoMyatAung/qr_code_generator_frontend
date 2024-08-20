import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetQrByQrIdQuery, useScanQrMutation } from '../reducers/qrSlice';
import FullPageBackdrop from '../components/shared/FullPageBackdrop';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { QRType } from '../libs/constants';
import VCardPreview from '../components/features/qr/VCardPreview';
import { Employee, Media } from '../libs/models/qr';
import MediaPreview from '../components/features/qr/MediaPreview';

export type MyParams = {
  id: string;
};

const ScanPage = () => {
  let { id } = useParams<keyof MyParams>() as MyParams;
  const { data, isError, isLoading, isSuccess } = useGetQrByQrIdQuery(id);
  const [scanQr] = useScanQrMutation();

  useEffect(() => {
    scanQr(id).then((res) => console.log("SCAN SUCCESS")).catch(() => console.log("SCAN FAIL"))
  }, [id, scanQr]);
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
    if (qrData.type === QRType.WEBSITE) {
      window.location.href = qrData.data as string;
    }
    if (qrData.type === QRType.V_CARD) {
      content = <VCardPreview employee={qrData.data as Employee} />
    }
    if (qrData.type === QRType.IMAGE || qrData.type === QRType.PDF) {
      content = <MediaPreview data={qrData.data as Media} qrType={qrData.type} file={null} />
    }
  }
  return (
    <div className='overflow-scroll'>{content}</div>
  )
}

export default ScanPage