import { QRType } from "../constants";
import { Admin } from "./admin";
import { Pagination } from "./responses";

export interface QR {
  _id: string;
  qrName: string;
  type: QRType;
  qrId: string;
  qrcode: {
    url: string;
    key: string;
    _id: string;
  };
  data: string | Employee | Media;
  status: boolean;
  scanCount: number;
  createdBy: Admin;
  updatedBy: Admin;
  scanHistory: { date: string; scanCount: number }[];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}


export interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  job: string;
  address: string;
  summary: string;
  media?: {
    url: string;
    key: string;
  };
}

export interface Media {
  company: string;
  title: string;
  description: string;
  media?: {
    url: string;
    key: string;
  };
}

export interface QRPagination extends Pagination {
  status?: boolean;
  qrName?: string;
  type?: QRType;
}
