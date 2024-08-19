export function objectToQueryString(obj: Record<string, any>): string {
    const queryString = Object.keys(obj)
        .filter((key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== "" && obj[key] !== 0)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");

    return queryString;
}

export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - 3) + '...';
}

export function formatNumberWithThousandSeparator(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}