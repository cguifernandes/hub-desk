import { ButtonHTMLAttributes } from 'react'
import Button from '../button'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  href?: string
  loading?: boolean
}

const FormButton = ({ text, className, loading, ...props }: ButtonProps) => {
  return (
    <Button loading={loading} text={text} {...props} className={className} />
  )
}

export default FormButton
