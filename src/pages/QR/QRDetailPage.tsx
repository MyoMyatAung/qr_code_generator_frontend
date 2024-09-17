import React from "react";
import { Link, useParams } from "react-router-dom";
import { useChangeAppTitle } from "../../hooks/useChangeAppTitle";
import { useGetQrByIdQuery, useToggleQrMutation } from "../../reducers/qrSlice";
import FullPageBackdrop from "../../components/shared/FullPageBackdrop";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { Employee, Media } from "../../libs/models/qr";
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT, QRType, RoutesPath, TOAST_SEVERITY } from "../../libs/constants";
import Button from "../../components/form/Button";
import IBarChart from "../../components/shared/BarChart";
import { readableDate } from "../../utils/dateFormatter";
import { MdOutlineEdit } from "react-icons/md";
import { useAppDispatch } from "../../store";
import { openSnackbar } from "../../reducers/appSlice";
import { HTTPResponseError } from "../../utils/error";

export type MyParams = {
  id: string;
};

type TDProps = {
  children: React.ReactNode,
  isHead?: boolean
}

const TD: React.FC<TDProps> = ({ children, isHead = false }) => {
  return <td className={`border p-2 text-left text-sm ${isHead ? 'font-semibold' : ''} align-top`}>
    {children}
  </td>
}

const QRDetailPage = () => {
  useChangeAppTitle("Edit QR");
  const dispatch = useAppDispatch();

  let { id } = useParams<keyof MyParams>() as MyParams;
  const { data, isError, isLoading, isSuccess } = useGetQrByIdQuery(id);
  const [toggleQr, { isLoading: toggleLoading }] = useToggleQrMutation();

  const handleToggleQr = async (id: string, status: boolean) => {
    try {
      await toggleQr({ id, data: { status } }).unwrap();
      dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: "Successfully created QR code!" }));
    } catch (error) {
      const customError = HTTPResponseError.fromResponse(error);
      dispatch(openSnackbar({ severity: TOAST_SEVERITY.ERROR, message: customError.message }));
    }
  }

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
    content = <>
      <table className="w-full bg-white">
        <tr>
          <TD isHead>QR Information</TD>
          <TD>
            <div className="flex items-center justify-between">
              <div><b>Name: </b>{qrData.qrName} &nbsp;|&nbsp; <b>QR ID: </b>{qrData.qrId} &nbsp;|&nbsp; <b>QR Type: </b>{qrData.type}</div>
              <Link to={`/${RoutesPath.EIDT}/${qrData._id}`}>
                <Button label="Edit QR" type={BUTTON_TYPE.BUTTON} startIcon={<MdOutlineEdit />} />
              </Link>
            </div>
          </TD>
        </tr>
        <tr>
          <TD isHead>QR Code</TD>
          <TD><img src={`${process.env.REACT_APP_API_URL}/qrcode/${qrData.qrcode.key}`} alt={qrData.qrName} /></TD>
        </tr>
        <tr>
          <TD isHead>QR Data</TD>
          {
            qrData.type === QRType.WEBSITE &&
            <TD>{qrData.data as string}</TD>
          }
          {
            qrData.type === QRType.V_CARD &&
            <TD>
              <h3 className="text-lg font-semibold mb-4">Employee Information: </h3>
              <img className='avatar' src={`${process.env.REACT_APP_API_URL}/media/${(qrData.data as Employee).media?.key}`} alt={(qrData.data as Employee).firstName} width={120} height="auto" />
              <div className="flex gap-4 items-baseline">
                <div>
                  <p className="my-1 text-sm"><b>First Name</b></p>
                  <p className="my-1 text-sm"><b>Last Name</b></p>
                  <p className="my-1 text-sm"><b>Phone Number</b></p>
                  <p className="my-1 text-sm"><b>E-mail</b></p>
                  <p className="my-1 text-sm"><b>Company</b></p>
                  <p className="my-1 text-sm"><b>Job</b></p>
                  <p className="my-1 text-sm"><b>Address</b></p>
                  <p className="my-1 text-sm"><b>Summary</b></p>
                </div>
                <div>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).firstName}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).lastName}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).phone}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).email}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).company}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).job}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).address}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Employee).summary}</p>
                </div>
              </div>
            </TD>
          }
          {
            (qrData.type === QRType.PDF || qrData.type === QRType.IMAGE) &&
            <TD>
              <h3>{qrData.type === QRType.PDF ? "PDF" : "Image"} Information: </h3>
              <div className="flex gap-2">
                <div>
                  <p className="my-1 text-sm"><b>Company</b></p>
                  <p className="my-1 text-sm"><b>Title</b></p>
                  <p className="my-1 text-sm"><b>Description</b></p>
                  <p className="my-1 text-sm"><b>File</b></p>
                </div>
                <div>
                  <p className="my-1 text-sm">: {(qrData.data as Media).company}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Media).title}</p>
                  <p className="my-1 text-sm">: {(qrData.data as Media).description}</p>
                  <p className="my-1 text-sm">:
                    {qrData.type === QRType.PDF && <embed src={`${process.env.REACT_APP_API_URL}/media/${(qrData.data as Media).media?.key}`} width={"100%"} height={350} />}
                    {qrData.type === QRType.IMAGE && <img src={`${process.env.REACT_APP_API_URL}/media/${(qrData.data as Media).media?.key}`} alt={qrData.qrName} width={320} height="auto" />}
                  </p>
                </div>
              </div>
            </TD>
          }
        </tr>
        <tr>
          <TD isHead>QR Status</TD>
          <TD>
            <div className="flex gap-4 items-center">
              <span className={`text-lg font-semibold ${qrData.status === true ? "text-success" : "text-red-600"}`}>[{qrData.status === true ? "Active" : "Paused"}]</span>
              <Button onClick={() => handleToggleQr(qrData._id, !qrData.status)} size={BUTTON_SIZE.SMALL} variant={qrData.status === true ? BUTTON_VARIANT.ERROR : BUTTON_VARIANT.SUCCESS} type={BUTTON_TYPE.BUTTON} label={qrData.status === true ? "Pause" : "Reactive"} />
            </div>
          </TD>
        </tr>
        <tr>
          <TD isHead>QR Scan</TD>
          <TD>
            <div>
              <p><b>Total Scan: </b> {qrData.scanCount}</p>
              {
                qrData.scanCount !== 0 && <div className="border w-fit">
                  <IBarChart data={qrData.scanHistory} />
                </div>
              }
            </div>
          </TD>
        </tr>
        <tr>
          <TD isHead>Created</TD>
          <TD>
            <span>This QR code is created by <b>{qrData.createdBy.username}</b> at <b>{readableDate(qrData.createdAt)}</b></span>
          </TD>
        </tr>
        <tr>
          <TD isHead>Updated</TD>
          <TD>
            <span>This QR code is created by <b>{qrData.updatedBy.username}</b> at <b>{readableDate(qrData.updatedAt)}</b></span>
          </TD>
        </tr>
      </table>
    </>
  }
  return (
    <>
      {
        toggleLoading && <FullPageBackdrop>
          <LoadingSpinner />
        </FullPageBackdrop>
      }
      {content}
    </>
  )
}

export default QRDetailPage