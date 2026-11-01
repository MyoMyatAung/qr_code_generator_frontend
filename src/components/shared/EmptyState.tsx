import React from 'react'
import { MdOutlineInbox } from "react-icons/md";

type Props = {
    message: string
}

const EmptyState: React.FC<Props> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 border bg-white px-4 py-12 mt-2 text-gray-500">
            <MdOutlineInbox className="text-5xl text-gray-400" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    )
}

export default EmptyState
