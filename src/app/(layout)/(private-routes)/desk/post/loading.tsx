import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_100px)] flex-col items-center py-8 md:min-h-[calc(100vh_-_80px_-_64px)] lg:py-10">
      <div className="flex w-full flex-col items-center gap-y-px px-8 pb-4 lg:px-10 lg:pb-6">
        <Skeleton className="w-4/5" height={28} />
        <Skeleton width={290} height={24} />
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-y-12 px-4 pb-4 lg:flex-row lg:pb-6">
        <div className="w-full min-w-0 max-w-[630px] space-y-8 sm:min-w-[400px] lg:w-full lg:pr-6">
          <div className="flex w-full flex-col justify-start gap-y-px">
            <Skeleton width={170} height={20} />
            <Skeleton className="w-full" height={50} />
          </div>
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="flex w-full flex-col justify-start gap-y-px">
              <Skeleton width={210} height={20} />
              <Skeleton className="w-full" height={50} />
            </div>
            <div className="flex w-full flex-col justify-start gap-y-px">
              <Skeleton width={100} height={20} />
              <Skeleton className="w-full" height={50} />
            </div>
          </div>
          <div className="flex w-full flex-col justify-start gap-y-px">
            <Skeleton width={120} height={20} />
            <Skeleton className="w-full" height={50} />
          </div>
          <div className="flex w-full flex-col justify-start gap-y-px">
            <Skeleton width={120} height={20} />
            <Skeleton className="w-full" height={192} />
          </div>
          <Skeleton className="w-full" height={48} />
        </div>
        <div className="relative flex h-[600px] w-full min-w-[320px] max-w-[500px] flex-col justify-between  rounded-md border border-grey-400 bg-desk-gradient p-7 shadow-md sm:min-w-[460px] lg:w-2/5 lg:max-w-[500px]">
          <div className="flex w-full flex-col items-center space-y-1">
            <Skeleton className="w-full" height={28} />
            <Skeleton width={60} height={24} />
          </div>
          <Skeleton className="w-full" height={64} />
          <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
            <Skeleton width={120} height={32} />
            <Skeleton width={210} height={32} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Loading
