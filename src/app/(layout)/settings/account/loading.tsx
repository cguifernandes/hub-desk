import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-y-6 border-b-2 border-grey-400 pb-6">
        <Skeleton height={28} width={240} />
        <Skeleton isRoundedFull className="h-52 w-52 md:h-60 md:w-60" />
        <div className="w-11/12 space-y-6 md:w-4/5">
          <Skeleton height={50} className="w-full" />
          <Skeleton height={50} className="w-full" />
          <Skeleton height={50} className="w-full" />
        </div>
      </div>
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex flex-col items-start justify-center space-y-1 text-left">
          <Skeleton width={130} height={28} />
          <Skeleton className="w-full" height={24} />
        </div>
        <Skeleton className="w-3/4" height={48} />
      </div>
    </>
  )
}

export default Loading
