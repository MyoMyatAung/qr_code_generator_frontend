import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../../store";
import Modal from "../../shared/Modal";
import { HTTPResponseError } from "../../../utils/error";
import { openSnackbar } from "../../../reducers/appSlice";
import { BUTTON_TYPE, BUTTON_VARIANT, TOAST_SEVERITY } from "../../../libs/constants";
import { closeConfirmDialog, setSelectedAdmin, useDeleteAdminMutation } from "../../../reducers/adminSlice";
import Button from "../../form/Button";

const AdminDeleteModal = () => {
    const { selectedAdmin, confirmDialog } = useAppSelector(state => state.admin);
    const { isOpen, title, description } = confirmDialog;
    const dispatch = useAppDispatch();

    const [deleteAdmin, { isLoading }] = useDeleteAdminMutation();

    const handleDelete = async () => {
        try {
            if (!selectedAdmin) {
                handleClose();
                return;
            }
            await deleteAdmin(selectedAdmin._id).unwrap();
            dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: "Successfully deleted category!" }));
        } catch (error) {
            const customError = HTTPResponseError.fromResponse(error);
            dispatch(openSnackbar({ severity: TOAST_SEVERITY.ERROR, message: customError.message }));
        }
    }

    const handleClose = () => {
        dispatch(setSelectedAdmin(null));
        dispatch(closeConfirmDialog());
    }
    const handleConfirm = async () => {
        await handleDelete();
        handleClose();
    }

    return <Modal open={isOpen} closeModal={handleClose}>
        <div className="m-2 flex items-center justify-between">
            <h3 className="text-lg text-red-600 font-semibold">{title}</h3>
            <button onClick={handleClose} className="text-gray-600"                >
                <RxCross2 />
            </button>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="m-2">
            <p className="text-gray-600">{description}</p>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <div className="m-2 flex justify-end items-center gap-1">
            <Button disabled={isLoading} variant={BUTTON_VARIANT.INFO} label="Cancel" onClick={handleClose} type={BUTTON_TYPE.BUTTON} />
            <Button isLoading={isLoading} variant={BUTTON_VARIANT.ERROR} label="Confirm" onClick={handleConfirm} type={BUTTON_TYPE.BUTTON} />
        </div>
    </Modal>
}

export default AdminDeleteModal;