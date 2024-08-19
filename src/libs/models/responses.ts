export interface Meta {
    page: number,
    limit: number,
    total: number,
    totalPage: number
}

export interface IResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    meta: Meta,
    error: any,
}

export interface Pagination {
    page: number;
    limit: number;
}

export interface Options {
    _id: string;
    label: string;
}