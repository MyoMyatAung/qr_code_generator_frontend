import React from 'react'
import Logo from "../../../assets/logo.jpg";

type Props = {
  message: string
}

const ErrorQr: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="bg-gray-100 border lg:w-1/2 p-6 rounded-md ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <img src={Logo} alt="Logo" className="w-40 m-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
            Error In Loading QR
          </h2>
          <h1>{message}</h1>
        </div>
      </div>
    </div>
  )
}

export default ErrorQr