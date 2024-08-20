import React from 'react'
import { QRType } from '../../libs/constants'
import { UseFormRegister } from 'react-hook-form'
import { QRInput } from '../../libs/schemas/qr.schema'

type Props = {
  register: UseFormRegister<QRInput>,
  qrType: QRType,
  value: QRType,
  label: String,
}

const CustomRadioButton: React.FC<Props> = ({ register, qrType, value, label }) => {
  return (
    <label style={radioStyle}>
      <input
        type="radio"
        value={value}
        {...register('qrType')}
        style={{ display: 'none' }}
      />
      <div style={radioButtonStyle(qrType === value)}>{label}</div>
    </label>
  )
}

// Custom style for the radio buttons
const radioStyle: React.CSSProperties = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const radioButtonStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: isActive ? '#007bff' : '#e9ecef',
  color: isActive ? '#fff' : '#000',
  border: isActive ? '1px solid #007bff' : '1px solid #ced4da',
  transition: 'background-color 0.3s, color 0.3s',
  textAlign: 'center',
});

export default CustomRadioButton