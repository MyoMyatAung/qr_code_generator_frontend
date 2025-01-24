import React from "react";
import {
    FieldArray,
    FieldArrayMethodProps,
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayRemove,
    UseFormRegister
} from "react-hook-form";
import {QRInput} from "../../../libs/schemas/qr.schema";
import {IInput} from "../../form/Input";
import {socialList} from "../../../libs/constants/social-list";
import SocialFormItem from "./SocialFormItem";
import {BUTTON_TYPE, SocialType} from "../../../libs/constants";

type Props = {
    register: UseFormRegister<QRInput>,
    errors: FieldErrors<QRInput>,
    fields: FieldArrayWithId<QRInput, "social.socialMedia", "id">[],
    onAppend: (value: (FieldArray<QRInput, "social.socialMedia"> | FieldArray<QRInput, "social.socialMedia">[]), options?: FieldArrayMethodProps) => void,
    onRemove:  UseFieldArrayRemove
}

const SocialForm: React.FC<Props> = ({register, errors, fields, onAppend, onRemove}) => {
    const onHandleAppend = (type: SocialType) => {
        onAppend({
            text: 'Visit us online',
            url: 'www.your-website.com',
            type: type
        });
    }
    return (
        <>
            <div className='my-4'>
                <label>File:</label>
                <input type="file" {...register('social.file')} required/>
            </div>
            <hr className='mb-4'/>
            <IInput
                register={register}
                id="social.title"
                label="Title:"
                placeHolder="Enter social card title"
                name="social.title"
                required={true}
                error={errors.social?.title?.message || ""}
            />
            <IInput
                register={register}
                id="social.description"
                label="Description:"
                placeHolder="Enter social card description"
                name="social.description"
                required={true}
                error={errors.social?.description?.message || ""}
            />
            <hr className='mb-4'/>
            {
                fields.map((field, index) => {
                    return <SocialFormItem register={register} errors={errors} field={field} index={index} key={field.id} onRemove={onRemove}/>
                })
            }
            <div className='flex justify-between items-center gap-1 my-4'>
                {socialList.map((social, index) => {
                    return <button type={BUTTON_TYPE.BUTTON} onClick={() => onHandleAppend(social.type)} key={index}>
                        {social.img}
                    </button>
                })}
            </div>
        </>
    );
}

export default SocialForm;