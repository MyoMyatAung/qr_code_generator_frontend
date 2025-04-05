import {SocialType} from "./index";
import {MdLanguage} from "react-icons/md";
import {
    FaFacebook,
    FaFacebookMessenger,
    FaInstagram,
    FaLinkedin,
    FaTelegramPlane,
    FaTiktok,
    FaTwitter,
    FaWhatsapp,
    FaYoutube,
    FaViber
} from "react-icons/fa";
import {BsTwitterX} from "react-icons/bs";

import {ReactNode} from "react";

export const socialList: Array<{type: SocialType, name: string, img: ReactNode}> = [
    {
        type: SocialType.WEBSITE,
        name: "Website",
        img: <MdLanguage className='text-2xl text-gray-500'/>,
    },
    {
        type: SocialType.FACEBOOK,
        name: "Facebook",
        img: <FaFacebook className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.TWITTER,
        name: "Twitter",
        img: <FaTwitter className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.LINKEDIN,
        name: "LinkedIn",
        img: <FaLinkedin className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.INSTAGRAM,
        name: "Instagram",
        img: <FaInstagram className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.YOUTUBE,
        name: "YouTube",
        img: <FaYoutube className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.TIKTOK,
        name: "TikTok",
        img: <FaTiktok className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.WHATSAPP,
        name: "WhatsApp",
        img: <FaWhatsapp className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.TELEGRAM,
        name: "Telegram",
        img: <FaTelegramPlane className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.MESSENGER,
        name: "Messenger",
        img: <FaFacebookMessenger className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.X,
        name: "X",
        img: <BsTwitterX className='text-2xl text-gray-500'/>
    },
    {
        type: SocialType.VIBER,
        name: "Viber",
        img: <FaViber className='text-2xl text-gray-500'/>
    }
];