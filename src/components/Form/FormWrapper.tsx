/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from 'lucide-react'

type FormWrapper = {
  register: any
  name: string
}

const FormWrapper = ({ name, register }: FormWrapper) => {
  return (
    <label
      htmlFor="checkbox"
      className="relative left-0 flex cursor-pointer items-center"
    >
      <input
        {...register(name)}
        type="checkbox"
        id="checkbox"
        className="h-6 w-6 appearance-none bg-white"
      />
      <Check
        size={20}
        color="#075985"
        className="check absolute left-[2px] opacity-0 transition-opacity"
      />
      <span className="ml-2 text-white">Lembrar de mim?</span>
    </label>
  )
}

export default FormWrapper
