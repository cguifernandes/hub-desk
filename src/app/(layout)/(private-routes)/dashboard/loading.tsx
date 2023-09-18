import Skeleton from '@/components/Layout/skeleton'
import clsx from 'clsx'

const Loading = () => {
  return (
    <>
      <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
        <Skeleton width={345} height={32} />
      </div>
      <div
        className={clsx(
          'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 p-10',
        )}
      >
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
        <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
      </div>
    </>
  )
}

export default Loading
