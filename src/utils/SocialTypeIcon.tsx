import {SocialType} from "../libs/constants";
import {MdLanguage} from "react-icons/md";
import {
    FaFacebook, FaFacebookMessenger,
    FaInstagram,
    FaLinkedin,
    FaTelegramPlane,
    FaTiktok,
    FaTwitter, FaViber,
    FaWhatsapp,
    FaYoutube
} from "react-icons/fa";
import {BsTwitterX} from "react-icons/bs";

type Props = {
    type: SocialType
}

const SocialTypeIcon: React.FC<Props> = ({type}) => {
    switch (type) {
        case SocialType.WEBSITE:
            return <MdLanguage className='text-2xl text-gray-500'/>;
        case SocialType.FACEBOOK:
            return <FaFacebook className='text-2xl text-gray-500'/>
        case SocialType.TWITTER:
            return <FaTwitter className='text-2xl text-gray-500'/>
        case SocialType.LINKEDIN:
            return <FaLinkedin className='text-2xl text-gray-500'/>
        case SocialType.INSTAGRAM:
            return <FaInstagram className='text-2xl text-gray-500'/>
        case SocialType.YOUTUBE:
            return <FaYoutube className='text-2xl text-gray-500'/>
        case SocialType.TIKTOK:
            return <FaTiktok className='text-2xl text-gray-500'/>
        case SocialType.WHATSAPP:
            return <FaWhatsapp className='text-2xl text-gray-500'/>
        case SocialType.TELEGRAM:
            return <FaTelegramPlane className='text-2xl text-gray-500'/>
        case SocialType.MESSENGER:
            return <FaFacebookMessenger className='text-2xl text-gray-500'/>
        case SocialType.X:
            return <BsTwitterX className='text-2xl text-gray-500'/>
        case SocialType.VIBER:
            return <FaViber className='text-2xl text-gray-500'/>
        default:
            return <MdLanguage className='text-2xl text-gray-500'/>;
    }
}

export default SocialTypeIcon;