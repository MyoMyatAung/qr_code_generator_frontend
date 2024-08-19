import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useAppDispatch } from "../../../store";
import { Admin } from "../../../libs/models/admin";
import { openConfirmDialog, setSelectedAdmin, toggleFormDialog } from "../../../reducers/adminSlice";

type Props = {
    admin: Admin
}

const AdminTableActions: React.FC<Props> = ({ admin }) => {
    const dispatch = useAppDispatch();

    const handleOnEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(setSelectedAdmin(admin));
        dispatch(toggleFormDialog(true));
    }

    const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch(setSelectedAdmin(admin));
        dispatch(openConfirmDialog({ title: "Confirm to delete Category", description: "Are you sure you want to delete?" }))
    }

    return <>
        <div className="flex items-center gap-2">
            <button onClick={handleOnEdit} className="font-medium text-blue-600 hover:underline">
                <BsPencilSquare />
            </button>
            <button onClick={handleOnDelete} className="font-medium text-red-600 hover:underline">
                <BsTrash />
            </button>
        </div>
    </>
}

export default AdminTableActions;