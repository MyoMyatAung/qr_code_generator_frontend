import {Social} from "../../../libs/models/qr";
import React, {useEffect, useState} from "react";
import {toBase64} from "../../../utils";
import SocialTypeIcon from "../../../utils/SocialTypeIcon";
import {BUTTON_TYPE} from "../../../libs/constants";

type Props = {
    social: Social,
    file?: File | null,
}

const SocialPreview: React.FC<Props> = ({social, file}) => {
    const [fileBase64, setFileBase64] = useState<string | null>(null);

    useEffect(() => {
        if (!!file) {
            toBase64(file).then((res) => setFileBase64(res as string)).catch((e) => console.log(e));
        }
    }, [file])

    const onNavigateUrl = (url: string) => {
        window.location.href = url;
    }
    return <>
        <div className='border bg-white'>
            {
                !!fileBase64 ?
                    <img className='w-full h-40' src={fileBase64} alt={social.title} height="auto"/>
                    :
                    <img className='w-full h-40' src={`${process.env.REACT_APP_API_URL}/media/${social.media?.key}`}
                         alt={social.title} height="auto"/>
            }
            <div className='w-full h-40 bg-[#A82028] flex flex-col items-center justify-center text-white'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl font-semibold my-4'>{social.title}</h1>
                    <p className='text-xs text-gray-300'>{social.description}</p>
                </div>
            </div>
            <div className='bg-gray-50'>
                {
                    social.socialMedia.map((social, index) => {
                        return <button key={index} type={BUTTON_TYPE.BUTTON} onClick={() => onNavigateUrl(social.url)} className='block w-full p-4 border-t border-gray-200'>
                            <div className='flex items-center justify-start gap-4'>
                                <SocialTypeIcon type={social.type}/>
                                <div className='text-left w-1/2 md:w-full'>
                                    <p className='text-sm'>{social.text}</p>
                                    <p className='text-xs text-gray-500 overflow-hidden'>{social.url}</p>
                                </div>
                            </div>
                        </button>
                    })
                }
            </div>
        </div>
    </>
}

export default SocialPreview;