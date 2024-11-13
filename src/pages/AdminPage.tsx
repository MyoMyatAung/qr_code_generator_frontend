import { useState } from "react";
import { useChangeAppTitle } from "../hooks/useChangeAppTitle";
import { toggleFormDialog, useGetAdminsQuery } from "../reducers/adminSlice";
import FullPageBackdrop from "../components/shared/FullPageBackdrop";
import AdminList from "../components/features/admins/AdminList";
import Button from "../components/form/Button";
import { BUTTON_TYPE } from "../libs/constants";
import AdminFormModal from "../components/features/admins/AdminFormModal";
import AdminDeleteModal from "../components/features/admins/AdminDeleteModal";
import { HTTPResponseError } from "../utils/error";
import { useAppDispatch } from "../store";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const AdminPage = () => {
    useChangeAppTitle("Admins");
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const { data, isError, isLoading, isSuccess, error } = useGetAdminsQuery({ limit, page });

    const handleOpen = () => {
        dispatch(toggleFormDialog(true));
    };

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
        const { data: adminData, meta } = data;
        content = <AdminList adminData={adminData} limit={limit} meta={meta} page={page} setLimit={setLimit} setPage={setPage} />
    }

    return (
        <div className="my-2">
            <div className="mb-2">
                <Button label="Add Admin" onClick={handleOpen} type={BUTTON_TYPE.BUTTON} />
            </div>
            {content}
            <AdminFormModal />
            <AdminDeleteModal />
        </div>
    )
}

export default AdminPage