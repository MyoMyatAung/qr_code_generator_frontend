import { z } from 'zod';
import { QRType } from '../constants';

// Define Zod schema for validation
export const qrSchema = z.object({
  qrName: z.string().min(1, 'QR Name is required'),
  qrType: z.enum([QRType.WEBSITE, QRType.V_CARD, QRType.PDF, QRType.IMAGE], {
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