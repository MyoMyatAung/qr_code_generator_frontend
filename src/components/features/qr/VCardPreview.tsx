import React from 'react'
import { Employee } from '../../../libs/models/qr'
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";

type Props = {
  employee: Employee
}

const VCardPreview: React.FC<Props> = ({ employee }) => {
  return (
    <div className='border bg-white'>
      <div className='w-full h-40 bg-red-600 flex flex-col items-center justify-center text-white'>
        <IoPersonCircleOutline className='text-5xl' />
        <h1 className='text-lg font-semibold my-2'>{employee.firstName} {employee.lastName}</h1>
        <p className='text-sm text-gray-300'>{employee.job}</p>
      </div>
      <div className="p-2">
        <div className='my-3 flex items-center gap-3'>
          <MdEmail />
          <p className='text-sm'>{employee.email}</p>
        </div>
        <hr />
        <div className='my-3 flex items-center gap-3'>
          <FaPhoneAlt />
          <p className='text-sm'>{employee.phone}</p>
        </div>
        <hr />
        <div className='my-3 flex items-center gap-3'>
          <IoBagSharp />
          <p className='text-sm'>{employee.company}</p>
        </div>
        <hr />
        <div className='my-3 flex items-center gap-3'>
          <MdLocationPin />
          <p className='text-sm'>{employee.address}</p>
        </div>
        <hr />
        <div className='my-3 flex items-center gap-3'>
          <FaCircleInfo />
          <p className='text-sm'>{employee.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default VCardPreview