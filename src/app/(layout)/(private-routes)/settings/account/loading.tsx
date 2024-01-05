import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-y-6 border-b-2 border-grey-400 pb-6">
        <Skeleton height={28} width={240} />
        <form className="w-11/12 space-y-6 md:w-4/5">
          <div className="relative flex h-[255px] items-center justify-center">
            <div className="absolute left-0 top-0 h-2/3 w-full">
              <Skeleton className="w-full" height={170} />
            </div>
            <div className="relative top-6 z-20 rounded-full">
              <Skeleton className="h-48 w-48 md:h-52 md:w-52" isRoundedFull />
            </div>
          </div>
          <div className="flex w-full flex-col justify-start gap-y-px">
            <Skeleton width={210} height={20} />
            <Skeleton className="w-full" height={50} />
          </div>
          <div className="flex w-full flex-col justify-start gap-y-px">
            <Skeleton width={210} height={20} />
            <Skeleton className="w-full" height={50} />
          </div>
          <Skeleton className="w-full" height={48} />
        </form>
      </div>
      <div className="flex flex-col space-y-6 py-6">
        <div className="flex flex-col items-start justify-center space-y-1 text-left">
          <Skeleton width={130} height={28} />
          <Skeleton className="w-11/12" height={24} />
        </div>
        <Skeleton className="w-3/4" height={48} />
      </div>
    </>
  )
}

export default Loading
