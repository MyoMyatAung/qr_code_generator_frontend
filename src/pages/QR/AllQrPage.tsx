import { useState } from "react";
import { useChangeAppTitle } from "../../hooks/useChangeAppTitle";
import { useGetQrsQuery } from "../../reducers/qrSlice";
import FullPageBackdrop from "../../components/shared/FullPageBackdrop";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { HTTPResponseError } from "../../utils/error";
import QrList from "../../components/features/qr/QrList";
import Button from "../../components/form/Button";
import { BUTTON_TYPE, RoutesPath } from "../../libs/constants";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllQrPage = () => {
  useChangeAppTitle("All QRs");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { data, isError, isLoading, isSuccess, error } = useGetQrsQuery({ limit, page });

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
          <IoMenu />
          <h3>Total QR Code ({meta.total})</h3>
        </div>
        <Link to={`/${RoutesPath.CREATE}`}>
          <Button label="Create QR Code" type={BUTTON_TYPE.BUTTON} />
        </Link>
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

export default AllQrPage