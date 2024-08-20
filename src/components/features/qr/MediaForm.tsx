import { FieldErrors, UseFormRegister } from "react-hook-form"
import { QRInput } from "../../../libs/schemas/qr.schema"
import { IInput } from "../../form/Input"

type Props = {
  register: UseFormRegister<QRInput>,
  errors: FieldErrors<QRInput>
}
const MediaForm: React.FC<Props> = ({ register, errors }) => {
  return (
    <>
      <IInput
        register={register}
        id="media.company"
        label="Company:"
        placeHolder="Enter company name"
        name="media.company"
        required
        error={errors.media?.company?.message || ""}
      />
      <IInput
        register={register}
        id="media.title"
        label="Title:"
        placeHolder="Enter title"
        name="media.title"
        required
        error={errors.media?.title?.message || ""}
      />
      <IInput
        register={register}
        id="media.description"
        label="Description:"
        placeHolder="Enter description"
        name="media.description"
        required
        error={errors.media?.description?.message || ""}
      />
      <div>
        <label>File:</label>
        <input type="file" {...register('media.file')} />
      </div>
    </>
  )
}

export default MediaForm