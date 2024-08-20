import React from 'react'
import { QR } from '../../../libs/models/qr'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import { dateFormatter } from '../../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { RoutesPath } from '../../../libs/constants';

type Props = {
  item: QR
}

const QrListItem: React.FC<Props> = ({ item }) => {
  return (
    <div className='flex items-center w-full border bg-white px-4 py-2 mt-2'>
      <div className='flex-1'>
        <div className='flex items-center gap-2 text-2xl font-semibold text-gray-600 my-2'> <BsFillPersonVcardFill /> <h1>{item.qrName}</h1></div>
        <div className='flex items-center gap-2 text-sm text-gray-600 my-2'> <CiLink className='text-2xl' /> <a href={`${process.env.REACT_APP_APP_URL}/${item.qrId}`} rel="noreferrer" target='_blank'>{process.env.REACT_APP_APP_URL}/{item.qrId}</a></div>
        <div className='flex items-center gap-3 text-sm text-gray-600 my-2'> <FaRegClock className='text-xl' /> <h1>{dateFormatter(item.updatedAt)}</h1></div>
      </div>
      <div className="inline-block h-36 w-[0.5px] self-stretch bg-gray-400 opacity-100 dark:opacity-50 mr-4" />
      <div className='flex gap-4 mx-12 items-center'>
        <div>
          <h3 className='text-2xl'>{item.scanCount}</h3>
          <p className='text-sm text-gray-600'>Scans</p>
          <Link to={`/${RoutesPath.QR}/${item._id}`} className='flex items-center gap-2 text-lg font-semibold text-primary mt-2'>Detail <FaArrowRight /></Link>
        </div>
        <div>
          <img src={`${process.env.REACT_APP_API_URL}/qrcode/${item.qrcode.key}`} alt={item.qrName} />
        </div>
      </div>
    </div>
  )
}

export default QrListItem