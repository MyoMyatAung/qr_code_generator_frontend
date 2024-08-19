import { useAppDispatch, useAppSelector } from "../../../store";
import Modal from "../../shared/Modal";
import { RxCross2 } from "react-icons/rx";
import AdminForm from "./AdminForm";
import { setSelectedAdmin, toggleFormDialog } from "../../../reducers/adminSlice";

type Props = {
    isAdmin?: boolean;
}

const AdminFormModal: React.FC<Props> = ({ isAdmin = true }) => {
    const { openFormDialog, selectedAdmin } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setSelectedAdmin(null));
        dispatch(toggleFormDialog(false));
    };
    return <Modal open={openFormDialog} closeModal={handleClose}>
        <div className="m-2 flex items-center justify-between">
            <h3 className="text-lg text-gray-600 font-semibold">{!!selectedAdmin ? "Update" : "Add new"} {isAdmin ? "Admin" : "User"}</h3>
            <button onClick={handleClose} className="text-gray-600">
                <RxCross2 />
            </button>
        </div>
        <hr className="h-px bg-gray-200 border-0" />
        <AdminForm handleClose={handleClose} isAdmin={isAdmin} />
    </Modal>
}

export default AdminFormModal;