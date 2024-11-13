import { useState } from "react";
import { useChangeAppTitle } from "../../hooks/useChangeAppTitle";
import { useGetQrsQuery } from "../../reducers/qrSlice";
import FullPageBackdrop from "../../components/shared/FullPageBackdrop";
import { HTTPResponseError } from "../../utils/error";
import QrList from "../../components/features/qr/QrList";
import { MdOutlinePauseCircle } from "react-icons/md";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const PauseQRPage = () => {
  useChangeAppTitle("Paused QRs");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isError, isLoading, isSuccess, error } = useGetQrsQuery({ limit, page, status: false });

  let content;
  if (isLoading) {
    content = <FullPageBackdrop>
      <LoadingSpinner />
    </FullPageBackdrop>;
  }
  if (isError) {
    const customError = HTTPResponseError.fromResponse(error);
    content = <>{customError.message}</>
  }
  if (isSuccess) {
    const { data: qrData, meta } = data;
    content = <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-gray-600">
          <MdOutlinePauseCircle />
          <h3>Paused QR Code ({meta.total})</h3>
        </div>
      </div>
      <QrList list={qrData} limit={limit} meta={meta} page={page} setLimit={setLimit} setPage={setPage} />
    </>
  }

  return (
    <div className="my-2">
      {content}
    </div>
  )
}

export default PauseQRPage