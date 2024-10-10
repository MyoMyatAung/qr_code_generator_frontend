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

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


export const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}