import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_100px)] flex-col items-center md:min-h-[calc(100vh_-_80px_-_64px)]">
      <div className="relative h-[calc(240px_+_252px_-_80px)] w-full md:h-[calc(240px_+_192px_-_96px)]">
        <Skeleton className="w-full" height={240} />
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center px-6 md:flex-row md:items-end md:justify-between md:px-10">
          <Skeleton
            className="mb-3 h-40 w-40 md:mb-0 md:h-48 md:w-48"
            isRoundedFull
          />
          <div className="flex items-center justify-center md:flex-1 md:justify-between md:pl-4">
            <div className="flex w-[216px] flex-col gap-y-px text-center md:text-left">
              <Skeleton className="mb-2 w-full" height={32} />
              <Skeleton className="w-full" height={20} />
              <Skeleton className="w-full" height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="my-16 flex h-full w-full flex-col">
        <div className="flex w-full flex-col items-center gap-y-1">
          <Skeleton width={120} height={32} />
          <Skeleton width={240} height={24} />
        </div>
        <div className="flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 px-4 py-10 md:p-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="relative flex h-[640px] min-w-[360px] max-w-[490px] flex-1 flex-col justify-between rounded-md border-2 border-grey-400 bg-desk-gradient p-7 shadow-md sm:min-w-[420px]"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Loading
