import AdminTableActions from "../../components/features/admins/AdminTableActions";
import { Col } from "../../components/shared/Table";
import { dateFormatter } from "../../utils/dateFormatter";
import { Admin } from "../models/admin";

export const AdminCols: Array<Col> = [
  {
    field: "_id",
    title: "ID"
  },
  {
    field: "username",
    title: "Admin Name",
  },
  {
    field: "email",
    title: "E-mail",
  },
  {
    field: "phone",
    title: "Phone",
  },
  {
    field: "createdAt",
    title: "Created Date",
    render: (val) => dateFormatter(val.createdAt),
  },
  {
    field: "updatedAt",
    title: "Updated Date",
    render: (val) => dateFormatter(val.createdAt),
  },
  {
    field: "name",
    title: "Action",
    render: (val: Admin) => {
      return <AdminTableActions admin={val} />;
    },
  },
];