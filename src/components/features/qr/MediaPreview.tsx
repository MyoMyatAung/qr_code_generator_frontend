import React, { useEffect, useState } from 'react'
import { Media } from '../../../libs/models/qr'
import { handleDownload, toBase64 } from '../../../utils';
import { QRType } from '../../../libs/constants';
import PdfRenderer from '../../shared/PdfRenderer';
import FullPageBackdrop from "../../shared/FullPageBackdrop";
import { IoMdClose } from "react-icons/io"

type Props = {
  data: Media,
  file?: File | null,
  qrType: QRType,
  qrCode: {
    url: string;
    key: string;
    _id: string;
  } | null
}

const MediaPreview: React.FC<Props> = ({ data, file = null, qrType, qrCode = null }) => {

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [fileBase64, setFileBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!!file) {
      toBase64(file).then((res) => setFileBase64(res as string)).catch((e) => console.log(e));
    }
  }, [file]);

  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  }

  return (
      <>
        {
          showPreview && <FullPageBackdrop>
              <div className="flex w-full h-full bg-gray-700 justify-center items-center">
                <button onClick={handleTogglePreview} className="absolute top-1 right-1"><IoMdClose className="text-white"/></button>
                <img className='m-auto' src={`${process.env.REACT_APP_API_URL}/media/${data.media?.key}`}
                     alt={data.title} width={"100%"} height="auto"/>
              </div>
            </FullPageBackdrop>
        }
        <div className='w-full h-screen bg-white border'>
          <div className='bg-[#A82028] text-white px-4 py-10'>
            <h1 className='text-sm text-gray-200 font-semibold'>{data.company}</h1>
            <h2 className='text-lg font-bold my-1'>{data.title}</h2>
            <p className='text-xs text-gray-200'>{data.description}</p>
          </div>
          <div className='mt-[-36px]'>
            {
              !!fileBase64 ?
                  qrType === QRType.IMAGE ?
                      <img className='m-auto rounded' src={fileBase64} alt={data.title}
                           width={"85%"} height="auto"/>
                      :
                      <PdfRenderer url={`${fileBase64}`}/>
                  :
                  qrType === QRType.IMAGE ?
                      <img onClick={handleTogglePreview} className='m-auto rounded' src={`${process.env.REACT_APP_API_URL}/media/${data.media?.key}`}
                           alt={data.title} width={"85%"} height="auto"/>
                      :
                      <PdfRenderer url={`${process.env.REACT_APP_API_URL}/media/${data.media?.key}`}/>
            }
          </div>
          {
              !!qrCode && <button title='Click to Download'
                                  onClick={() => handleDownload(`${process.env.REACT_APP_API_URL}/download/media/${data.media?.key}`, data.media?.key as string)}
                                  className='w-full p-2 bg-gray-500 text-white absolute bottom-0'>
                <h1 className='text-center text-xs'>View {qrType === QRType.IMAGE ? 'Image' : 'PDF'}</h1>
              </button>
          }
        </div>
      </>
  )
}

export default MediaPreview