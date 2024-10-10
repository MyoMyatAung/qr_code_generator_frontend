import { useState } from "react";
import { useChangeAppTitle } from "../../hooks/useChangeAppTitle";
import { useGetQrsQuery } from "../../reducers/qrSlice";
import FullPageBackdrop from "../../components/shared/FullPageBackdrop";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { HTTPResponseError } from "../../utils/error";
import QrList from "../../components/features/qr/QrList";
import { BsActivity } from "react-icons/bs";

const ActiveQRPage = () => {
  useChangeAppTitle("Active QRs");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isError, isLoading, isSuccess, error } = useGetQrsQuery({ limit, page, status: true });

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
          <BsActivity />
          <h3>Active QR Code ({meta.total})</h3>
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

export default ActiveQRPage