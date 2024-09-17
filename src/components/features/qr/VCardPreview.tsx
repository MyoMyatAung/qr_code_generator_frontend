import React, { useEffect, useState } from 'react'
import { Employee } from '../../../libs/models/qr'
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";
import { IoMdSend, IoIosInformationCircleOutline  } from "react-icons/io";
import { toBase64 } from '../../../utils';

type Props = {
  employee: Employee,
  file?: File | null,
}

const VCardPreview: React.FC<Props> = ({ employee, file = null }) => {

  const [fileBase64, setFileBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!!file) {
      toBase64(file).then((res) => setFileBase64(res as string)).catch((e) => console.log(e));
    }
  }, [file])

  console.log(employee.media)

  return (
    <div className='border bg-white'>
      <div className='w-full h-1/3 bg-[#A82028] flex flex-col items-center justify-between text-white'>
        <div className='flex flex-col items-center justify-center'>
          {
            !!fileBase64 ?
              <img className='avatar mt-10' src={fileBase64} alt={employee.firstName} width={120} height="auto" />
              :
              <img className='avatar mt-10' src={`${process.env.REACT_APP_API_URL}/media/${employee.media?.key}`} alt={employee.firstName} width={120} height="auto" />
          }
          <h1 className='text-2xl font-semibold my-4'>{employee.firstName} {employee.lastName}</h1>
          <p className='text-xs text-gray-300'>{employee.job}</p>
        </div>
        <div className='mt-5 w-full flex border-t justify-center'>
          <a href={`tel:${employee.phone}`} className='border-r h-16 flex flex-col justify-center items-center flex-1 gap-1'>
            <FaPhoneAlt className='text-2xl' />
            <p className='text-xs text-gray-200'>CALL</p>
          </a>
          <a href={`mailto:${employee.email}`} className='h-16 flex flex-col justify-center items-center flex-1 gap-1'>
            <IoMdSend className='text-2xl' />
            <p className='text-xs text-gray-200'>EMAIL</p>
          </a>
        </div>
      </div>
      <div className="p-2">
        <div className='my-4 flex items-center gap-5'>
          <MdEmail className='text-2xl text-gray-500' />
          <div>
            <a className='text-sm' href={`mailto:${employee.email}`} target='_top'>{employee.email}</a>
            <p className='text-xs text-gray-500'>E-mail</p>
          </div>
        </div>
        <hr />
        <div className='my-4 flex items-center gap-5'>
          <FaPhoneAlt className='text-2xl text-gray-500' />
          <div>
            <a className='text-sm' href={`tel:${employee.phone}`}>{employee.phone}</a>
            <p className='text-xs text-gray-500'>Telephone</p>
          </div>
        </div>
        <hr />
        <div className='my-4 flex items-center gap-5'>
          <IoBagSharp className='text-2xl text-gray-500' />
          <p className='text-sm'>{employee.company}</p>
        </div>
        <hr />
        <div className='my-4 flex items-start gap-5'>
          <div className='w-6 h-6'>
            <MdLocationPin className='text-2xl text-gray-600' />
          </div>
          <p className='text-sm'>{employee.address}</p>
        </div>
        <hr />
        <div className='my-4 flex items-start gap-5'>
          <div className='w-6 h-6'>
            <IoIosInformationCircleOutline className='text-2xl text-gray-600' />
          </div>
          <p className='text-sm'>{employee.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default VCardPreview