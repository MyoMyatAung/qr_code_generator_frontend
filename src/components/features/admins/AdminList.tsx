import { AdminCols } from "../../../libs/constants/columns";
import { Admin } from "../../../libs/models/admin";
import { Meta } from "../../../libs/models/responses";
import Pagination from "../../shared/Pagination";
import Table from "../../shared/Table";

type Props = {
    adminData: Array<Admin>,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    limit: number,
    page: number,
    meta: Meta
}

const AdminList: React.FC<Props> = ({ adminData, limit, meta, page, setLimit, setPage }) => {
    return <>
        <Table<Admin> cols={AdminCols} rows={adminData} />
        <Pagination
            setLimit={setLimit}
            setPage={setPage}
            limit={limit}
            page={page}
            length={adminData.length}
            total={meta.total}
            totalPage={meta.totalPage}
        />
    </>
}

export default AdminList;