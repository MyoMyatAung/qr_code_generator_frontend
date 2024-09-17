import React from 'react'
import { IInput } from '../../form/Input'
import ITextArea from '../../form/TextArea'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { QRInput } from '../../../libs/schemas/qr.schema'

type Props = {
  register: UseFormRegister<QRInput>,
  errors: FieldErrors<QRInput>
}

const VCardForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <div className='my-4'>
        <label>File:</label>
        <input type="file" {...register('vCard.file')} required/>
      </div>
      <hr className='mb-4'/>
      <IInput
        register={register}
        id="vCard.firstName"
        label="First Name:"
        placeHolder="Enter employee first name"
        name="vCard.firstName"
        required
        error={errors.vCard?.firstName?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.lastName"
        label="Last Name:"
        placeHolder="Enter employee last name"
        name="vCard.lastName"
        required
        error={errors.vCard?.lastName?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.phone"
        label="Phone:"
        placeHolder="Enter employee phone number"
        name="vCard.phone"
        required
        error={errors.vCard?.phone?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.email"
        label="E-mail:"
        placeHolder="Enter employee E-mail"
        name="vCard.email"
        required
        error={errors.vCard?.email?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.company"
        label="Company:"
        placeHolder="Enter employee company"
        name="vCard.company"
        required
        error={errors.vCard?.company?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.job"
        label="Job:"
        placeHolder="Enter employee job"
        name="vCard.job"
        required
        error={errors.vCard?.job?.message || ""}
      />
      <IInput
        register={register}
        id="vCard.address"
        label="Address:"
        placeHolder="Enter employee address"
        name="vCard.address"
        required
        error={errors.vCard?.address?.message || ""}
      />
      <ITextArea
        register={register}
        id="vCard.summary"
        label="Summary:"
        placeHolder="Enter employee summary"
        name="vCard.summary"
        required
        error={errors.vCard?.summary?.message || ""}
      />
    </>
  )
}

export default VCardForm