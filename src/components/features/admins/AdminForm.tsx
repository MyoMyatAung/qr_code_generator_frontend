import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAdminMutation, useUpdateAdminMutation } from '../../../reducers/adminSlice';
import { openSnackbar } from '../../../reducers/appSlice';
import { BUTTON_TYPE, BUTTON_VARIANT, TOAST_SEVERITY } from '../../../libs/constants';
import { HTTPResponseError } from '../../../utils/error';
import { IInput } from '../../form/Input';
import Button from '../../form/Button';
import { CreateAdminInput, createAdminSchema, UpdateAdminInput, updateAdminSchema } from '../../../libs/schemas/admin.schema';
import { Admin } from '../../../libs/models/admin';
import { useAppDispatch, useAppSelector } from '../../../store';

type Props = {
    handleClose: () => void;
    isAdmin?: boolean;
}

const defaultValues: CreateAdminInput | UpdateAdminInput = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
}

const extractDefaultValues = (admin: Admin | null): UpdateAdminInput | CreateAdminInput => {
    if (!!admin) {
        return { ...admin }
    } else {
        return defaultValues;
    }
}

const AdminForm: React.FC<Props> = ({ handleClose, isAdmin = true }) => {

    const { selectedAdmin } = useAppSelector(state => state.admin);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateAdminInput>({
        defaultValues: extractDefaultValues(selectedAdmin),
        resolver: zodResolver(!selectedAdmin ? createAdminSchema : updateAdminSchema)
    });

    const [createAdmin, { isLoading: createLoading }] = useCreateAdminMutation();
    const [updateAdmin, { isLoading: updateLoading }] = useUpdateAdminMutation();

    const onSubmit: SubmitHandler<CreateAdminInput | UpdateAdminInput> = async (formData) => {
        try {
            if (!!selectedAdmin) {
                // Update
                await updateAdmin({ id: selectedAdmin._id, data: formData }).unwrap();
                dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: `Successfully updated!` }));
            } else {
                // Create
                await createAdmin({
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    confirmPassword: (formData as CreateAdminInput).confirmPassword,
                    password: (formData as CreateAdminInput).password
                }).unwrap();
                dispatch(openSnackbar({ severity: TOAST_SEVERITY.SUCCESS, message: `Successfully created!` }));
            }
        } catch (error) {
            const customError = HTTPResponseError.fromResponse(error);
            dispatch(openSnackbar({ severity: TOAST_SEVERITY.ERROR, message: customError.message }));
        } finally {
            handleClose()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-2">
                <IInput
                    register={register}
                    id="username"
                    label="Admin Name"
                    placeHolder="Enter your admin name"
                    name="username"
                    required
                    error={errors.username?.message || ""}
                />
                <IInput
                    register={register}
                    id="email"
                    label="E-mail"
                    placeHolder="Eg. admin@gmail.com"
                    name="email"
                    required
                    error={errors.email?.message || ""}
                />
                <IInput
                    register={register}
                    id="phone"
                    label="Phone Number"
                    placeHolder="Eg. 09787800862"
                    name="phone"
                    required
                    error={errors.phone?.message || ""}
                />
                {
                    !selectedAdmin &&
                    <>
                        <IInput
                            register={register}
                            id="password"
                            label="Enter Password"
                            placeHolder="********"
                            name="password"
                            type="password"
                            required
                            error={errors.password?.message || ""}
                        />
                        <IInput
                            register={register}
                            id="confirmPassword"
                            label="Confirm Password"
                            placeHolder="*******"
                            name="confirmPassword"
                            type="password"
                            required
                            error={errors.confirmPassword?.message || ""}
                        />
                    </>
                }
                <hr className="h-px bg-gray-200 border-0" />
                <div className="m-2 flex items-center justify-end space-x-2 rounded-b">
                    <Button
                        disabled={createLoading || updateLoading}
                        label="Cancel"
                        onClick={handleClose}
                        type={BUTTON_TYPE.BUTTON}
                        variant={BUTTON_VARIANT.SECONDARY}
                    />
                    <Button isLoading={createLoading || updateLoading} label="Save" onClick={() => { }} type={BUTTON_TYPE.SUBMIT} />
                </div>
            </div>
        </form>
    )
}

export default AdminForm