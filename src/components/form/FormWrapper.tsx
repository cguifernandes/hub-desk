'use client'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'

const FormWrapper = () => {
  const [checkbox, setCheckbox] = useState(false)

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4">
      <label
        htmlFor="checkbox"
        className="relative mr-6 flex cursor-pointer items-center justify-center"
      >
        <input
          type="checkbox"
          id="checkbox"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCheckbox(event.target.checked)
          }
          className="h-6 w-6 appearance-none bg-white"
        />
        <Check
          size={20}
          color="#075985"
          className="check absolute left-[2px] opacity-0 transition-opacity"
        />
        <span className="ml-2 text-white">Lembrar de mim?</span>
      </label>
      <Link
        className="text-sky-600 transition-colors hover:text-sky-700"
        href={''}
      >
        Esqueceu a senha?
      </Link>
    </div>
  )
}

export default FormWrapper
