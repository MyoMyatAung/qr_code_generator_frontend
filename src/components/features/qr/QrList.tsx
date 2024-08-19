import React from 'react'
import { QR } from '../../../libs/models/qr'
import Pagination from '../../shared/Pagination';
import { Meta } from '../../../libs/models/responses';
import QrListItem from './QrListItem';

type Props = {
  list: Array<QR>,
  setLimit: React.Dispatch<React.SetStateAction<number>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  limit: number,
  page: number,
  meta: Meta
}

const QrList: React.FC<Props> = ({ list, setLimit, limit, meta, page, setPage }) => {
  return (
    <>
      {
        list.map((item, index) => {
          return <QrListItem item={item} key={item._id} />
        })
      }
      <Pagination
        setLimit={setLimit}
        setPage={setPage}
        limit={limit}
        page={page}
        length={list.length}
        total={meta.total}
        totalPage={meta.totalPage}
      />
    </>
  )
}

export default QrList