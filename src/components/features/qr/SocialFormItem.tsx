import {capitalize} from "../../../utils";
import {BsTrash} from "react-icons/bs";
import {IInput} from "../../form/Input";
import React from "react";
import {FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormRegister} from "react-hook-form";
import {QRInput} from "../../../libs/schemas/qr.schema";

type Props = {
    register: UseFormRegister<QRInput>,
    errors: FieldErrors<QRInput>,
    field: FieldArrayWithId<QRInput, "social.socialMedia", "id">,
    index: number,
    onRemove: UseFieldArrayRemove,
}

const SocialFormItem: React.FC<Props> = ({register, errors, field, index, onRemove}) => {

    const onHandleRemove = (index: number) => {
        onRemove(index);
    }

    return <div key={field.id}>
        <div className='flex justify-between items-center gap-1'>
            <h3 className='text-xl'>{capitalize(field.type)}</h3>
            <button onClick={() => onHandleRemove(index)} className="font-medium text-red-600 hover:underline">
                <BsTrash/>
            </button>
        </div>
        <IInput
            register={register}
            id={`social.socialMedia.${index}.text`}
            label="Text:"
            placeHolder="Enter social media text"
            name={`social.socialMedia.${index}.text`}
            required={true}
            error={errors.social?.socialMedia?.[index]?.text?.message || ""}
        />
        <IInput
            register={register}
            id={`social.socialMedia.${index}.url`}
            label="URL:"
            placeHolder="Enter social media URL"
            name={`social.socialMedia.${index}.url`}
            required={true}
            error={errors.social?.socialMedia?.[index]?.url?.message || ""}
        />
        <hr className='mb-4'/>
    </div>
}

export default SocialFormItem;