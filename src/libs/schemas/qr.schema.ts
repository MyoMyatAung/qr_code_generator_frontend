import {z} from 'zod';
import {QRType, SocialType} from '../constants';

// Define Zod schema for validation
export const qrSchema = z.object({
    qrName: z.string().min(1, 'QR Name is required'),
    qrType: z.enum([QRType.WEBSITE, QRType.V_CARD, QRType.PDF, QRType.IMAGE, QRType.SOCIAL], {
        required_error: 'QR Type is required',
    }),
    websiteLink: z.string().url('Invalid URL').optional(),
    vCard: z
        .object({
            firstName: z.string().min(1, 'First Name is required'),
            lastName: z.string().min(1, 'Last Name is required'),
            phone: z.string().min(1, 'Phone is required'),
            email: z.string().email('Invalid email address'),
            company: z.string().min(1, 'Company is required'),
            job: z.string().min(1, 'Job is required'),
            address: z.string().min(1, 'Address is required'),
            summary: z.string().min(1, 'Summary is required'),
            file: z.any().refine(
                (file) => file[0].type === 'application/pdf' || file[0].type.startsWith('image/'),
                'File must be a PDF or an Image'
            ),
        })
        .optional(),
    media: z
        .object({
            company: z.string().min(1, 'Company is required'),
            title: z.string().min(1, 'Title is required'),
            description: z.string().min(1, 'Description is required'),
            file: z.any().refine(
                (file) => file[0].type === 'application/pdf' || file[0].type.startsWith('image/'),
                'File must be a PDF or an Image'
            ),
        })
        .optional(),
    social: z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().min(1, 'Description is required'),
        socialMedia: z.array(
            z.object({
                text: z.string().min(1, 'Text is required'),
                url: z.string().url('Invalid URL'),
                type: z.enum([
                    SocialType.WEBSITE,
                    SocialType.FACEBOOK,
                    SocialType.X,
                    SocialType.INSTAGRAM,
                    SocialType.LINKEDIN,
                    SocialType.MESSENGER,
                    SocialType.TELEGRAM,
                    SocialType.TIKTOK,
                    SocialType.TWITTER,
                    SocialType.WHATSAPP,
                    SocialType.YOUTUBE,
                ]),
            })
        ).min(1, {message: 'Social media must have at least 1 item'}),
        file: z.any().refine(
            (file) => file[0].type.startsWith('image/'),
            'File must be an Image'
        ),
    })
}).refine(
    (data) => {
        // if (data.qrType === QRType.WEBSITE) {
        //   return !!data.websiteLink;
        // }
        // if (data.qrType === QRType.V_CARD) {
        //   return !!data.vCard;
        // }
        // if (data.qrType === QRType.PDF || data.qrType === QRType.IMAGE) {
        //   return !!data.media;
        // }
        return !!data.websiteLink;
    },
    {
        message: 'Relevant information must be provided for the selected QR Type',
        path: ['websiteLink', 'vCard', 'media'],
    }
);

export type QRInput = z.infer<typeof qrSchema>;