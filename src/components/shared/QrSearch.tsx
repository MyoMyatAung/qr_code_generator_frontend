import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  onSearch: (val: string) => void
}

const QrSearch: React.FC<Props> = ({ onSearch }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <form onSubmit={handleSearch} className='flex justify-between items-center border border-gray-300 p-2 bg-gray-50 w-full gap-2'>
      <input
        type="text"
        placeholder="Search QR code By QR name"
        onChange={handleOnChange}
        value={searchQuery}
        id="QR Search"
        className={`text-gray-600 bg-gray-50 text-sm focus:outline-none active:outline-none block w-full`}
      />
      <button type='submit'>
        <IoSearchOutline className='text-gray-600' />
      </button>
    </form>
  )
}

export default QrSearch