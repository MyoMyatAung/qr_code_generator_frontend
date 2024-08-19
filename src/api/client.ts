export class ApiClient {
    private baseUrl = process.env.REACT_APP_API_URL as string;
    private header: HeadersInit;

    constructor(header: HeadersInit, isAuthRequired: boolean) {
        this.header = { ...header };
        if (isAuthRequired) {
            this.header = {
                ...this.header,
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "x-refresh-token": localStorage.getItem("refreshToken") as string,
            };
        }
    }

    private async handleResponse(response: Response) {
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    }

    async get<T>(path: string): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, { headers: this.header });
        return this.handleResponse(response);
    }

    async post<T>(path: string, data: any): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, {
            method: "POST",
            headers: this.header,
            body: data,
        });
        return this.handleResponse(response);
    }

    async put<T>(path: string, data: any): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: this.header,
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }

    async delete<T>(path: string): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: this.header,
        });
        return this.handleResponse(response);
    }
}
