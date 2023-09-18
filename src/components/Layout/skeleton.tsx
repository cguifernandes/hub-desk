import clsx from 'clsx'

type SkeletonProps = {
  width?: string | number
  height?: string | number
  className?: string
  margin?: string | number
  isRoundedFull?: boolean
}

const Skeleton = ({
  height,
  width,
  className,
  margin,
  isRoundedFull,
}: SkeletonProps) => {
  return (
    <div
      style={{ width, height, margin }}
      className={clsx('animate-pulse', className)}
    >
      <div
        style={
          isRoundedFull ? { borderRadius: '9999px' } : { borderRadius: '6px' }
        }
        className={clsx('h-full w-full bg-grey-400')}
      />
    </div>
  )
}

export default Skeleton
