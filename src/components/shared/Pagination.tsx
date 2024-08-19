import React from 'react'
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
type Props = {
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setLimit: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    limit: number,
    length: number,
    total: number,
    totalPage: number
}
const Pagination: React.FC<Props> = ({ setPage, setLimit, page, limit, length, total, totalPage }) => {
    const handleNext = () => {
        if (page === totalPage) {
            return;
        }
        setPage((prev) => prev + 1);
    }
    const handlePrev = () => {
        if (page === 1) {
            return;
        }
        setPage((prev) => prev - 1);
    }
    return (
        <div className="flex items-center justify-between my-2">
            <p className="text-sm">Showing {((page - 1) * limit) + 1} to {((page - 1) * limit) + length} of {total} results</p>
            <div className='flex items-center justify-center gap-1'>
                <button onClick={handlePrev} className='border border-gray-400 px-2 rounded-md flex items-center gap-1'><MdArrowBackIos /> Prev</button>
                <button onClick={handleNext} className='border border-gray-400 px-2 rounded-md flex items-center gap-1'>Next <MdArrowForwardIos /></button>
            </div>
        </div>
    )
}

export default Pagination