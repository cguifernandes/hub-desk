'use client'
import Select from '@/components/select'
import { useState } from 'react'

const DisplaySelect = () => {
  const [selectedDropDown, setSelectedDropDown] = useState('')
  const itemsPerPage = [
    { id: 1, value: 12 },
    { id: 2, value: 16 },
    { id: 3, value: 20 },
    { id: 4, value: 24 },
    { id: 5, value: 28 },
  ]

  return (
    <Select
      value="Itens por página"
      setSelectedDropDown={setSelectedDropDown}
      selectedDropDown={selectedDropDown}
      dropDownItems={itemsPerPage}
      className="w-full sm:w-64"
    />
  )
}

export default DisplaySelect
