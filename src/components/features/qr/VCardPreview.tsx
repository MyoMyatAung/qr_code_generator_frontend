import React from 'react'
import { Employee } from '../../../libs/models/qr'
import { IoPersonCircleOutline } from "react-icons/io5";

type Props = {
  employee: Employee
}

const VCardPreview: React.FC<Props> = ({ employee }) => {
  return (
    <div className='border bg-white'>
      <div className='w-full h-40 bg-gray-400 flex flex-col items-center justify-center text-white'>
        <IoPersonCircleOutline className='text-3xl' />
        <h1>{employee.firstName} {employee.lastName}</h1>
        <p>{employee.job}</p>
      </div>
      <div className="p-2">
        <div className='my-2'>
          <p>{employee.email}</p>
        </div>
        <hr />
        <div className='my-2'>
          <p>{employee.phone}</p>
        </div>
        <hr />
        <div className='my-2'>
          <p>{employee.company}</p>
        </div>
        <hr />
        <div className='my-2'>
          <p>{employee.address}</p>
        </div>
        <hr />
        <div className='my-2'>
          <p>{employee.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default VCardPreview