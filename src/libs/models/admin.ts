import { Pagination } from "./responses";

export interface Admin {
    _id: string;
    username: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
}

export interface AdminPagination extends Pagination {
    isAdmin?: boolean;
    username?: string;
    email?: string;
    phone?: string;
}