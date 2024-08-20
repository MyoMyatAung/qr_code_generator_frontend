import React, { useEffect, useState } from 'react'
import { Media } from '../../../libs/models/qr'
import { toBase64 } from '../../../utils';
import { QRType } from '../../../libs/constants';

type Props = {
  data: Media,
  file?: File | null,
  qrType: QRType
}

const MediaPreview: React.FC<Props> = ({ data, file = null, qrType }) => {

  const [fileBase64, setFileBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!!file) {
      toBase64(file).then((res) => setFileBase64(res as string)).catch((e) => console.log(e));
    }
  }, [file])

  return (
    <div className='w-full bg-white border p-4'>
      <div className='my-2'><h1>{data.company}</h1></div>
      <hr />
      <div className='my-2'><h2>{data.title}</h2></div>
      <hr />
      <div className='my-2'><p>{data.description}</p></div>
      <hr />
      <div>
        {
          !!fileBase64 ?
            qrType === QRType.IMAGE ?
              <img src={fileBase64} alt={data.title} width={"100%"} height="auto" />
              :
              <embed src={fileBase64} width={"100%"} height={350} />
            :
            qrType === QRType.IMAGE ?
              <img src={`${process.env.REACT_APP_API_URL}/media/${data.media?.key}`} alt={data.title} width={"100%"} height="auto" />
              :
              <embed src={`${process.env.REACT_APP_API_URL}/media/${data.media?.key}`} width={"100%"} height={350} />
        }
      </div>
    </div>
  )
}

export default MediaPreview