import { ReactNode } from 'react'

const Alert = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center">
      <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
        {children}
      </div>
    </section>
  )
}

export default Alert
