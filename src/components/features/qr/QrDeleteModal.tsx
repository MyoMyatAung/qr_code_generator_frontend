import {RxCross2} from "react-icons/rx";
import Button from "../../form/Button";
import {BUTTON_TYPE, BUTTON_VARIANT, RoutesPath, TOAST_SEVERITY} from "../../../libs/constants";
import Modal from "../../shared/Modal";
import {openSnackbar} from "../../../reducers/appSlice";
import {HTTPResponseError} from "../../../utils/error";
import {useDeleteQrMutation, closeConfirmDialog} from "../../../reducers/qrSlice";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useNavigate} from "react-router-dom";

type Props = {
    id: string;
}

const QrDeleteModal: React.FC<Props> = ({id}) => {
    const navigate = useNavigate();

    const { confirmDialog } = useAppSelector(state => state.qr);
    const { isOpen, title, description } = confirmDialog;
    const dispatch = useAppDispatch();

    const [deleteQr, { isLoading }] = useDeleteQrMutation();

    const handleDelete = async () => {
        try {
            await deleteQr(id).unwrap();
            dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: "Successfully deleted QR Code!" }));
        } catch (error) {
            const customError = HTTPResponseError.fromResponse(error);
            dispatch(openSnackbar({ severity: TOAST_SEVERITY.ERROR, message: customError.message }));
        } finally {
            handleClose();
            navigate(`/${RoutesPath.ALL}`);
        }
    }

    const handleClose = () => {
        dispatch(closeConfirmDialog());
    }

    const handleConfirm = async () => {
        await handleDelete();
    }

    return <Modal open={isOpen} closeModal={handleClose}>
        <div className="m-2 flex items-center justify-between">
            <h3 className="text-lg text-red-600 font-semibold">{title}</h3>
            <button onClick={handleClose} className="text-gray-600">
                <RxCross2/>
            </button>
        </div>
        <hr className="h-px bg-gray-200 border-0"/>
        <div className="m-2">
            <p className="text-gray-600">{description}</p>
        </div>
        <hr className="h-px bg-gray-200 border-0"/>
        <div className="m-2 flex justify-end items-center gap-1">
            <Button disabled={isLoading} variant={BUTTON_VARIANT.INFO} label="Cancel" onClick={handleClose}
                    type={BUTTON_TYPE.BUTTON}/>
            <Button isLoading={isLoading} variant={BUTTON_VARIANT.ERROR} label="Confirm" onClick={handleConfirm}
                    type={BUTTON_TYPE.BUTTON}/>
        </div>
    </Modal>
}

export default QrDeleteModal;