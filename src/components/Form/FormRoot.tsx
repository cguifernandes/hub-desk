'use client'
import { FormEventHandler, ReactNode } from 'react'

type FormRootProps = {
  className?: string
  children: ReactNode
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
}

const FormRoot = ({ className, children, handleSubmit }: FormRootProps) => {
  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  )
}

export default FormRoot
