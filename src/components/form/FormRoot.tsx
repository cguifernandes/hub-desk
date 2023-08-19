import { ReactNode } from 'react'

type FormRootProps = {
  className: string
  children: ReactNode
}

const FormRoot = ({ className, children }: FormRootProps) => {
  return <form className={className}>{children}</form>
}

export default FormRoot
