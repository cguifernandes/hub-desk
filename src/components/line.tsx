import clsx from 'clsx'

const Line = ({ className }: { className?: string }) => {
  return <div className={clsx('h-[2px] w-full bg-grey-400', className)} />
}

export default Line
