import clsx from 'clsx'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  className?: string
}

const Skeleton = ({ height, width, className }: SkeletonProps) => {
  return (
    <div style={{ width, height }} className={clsx('w-full animate-pulse')}>
      <div
        className={clsx('h-full w-full rounded-md bg-grey-400', className)}
      />
    </div>
  )
}

export default Skeleton
