export type Col = {
    title: string;
    field: string;
    render?: (val: any) => {};
};

type Props<T> = {
    cols: Array<Col>;
    rows: Array<T>;
};

const Table = <T extends Record<string, any>>({ cols, rows }: Props<T>) => {
    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-sm">
            <table className="w-full text-xs text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {cols.map((data, index) => {
                            return (
                                <th className="p-4" key={index}>
                                    {data.title}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                {cols.map((col, index) => {
                                    return (
                                        <td key={index} className="px-4 py-2">
                                            {col.render ? col.render(row) : row[col.field]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
