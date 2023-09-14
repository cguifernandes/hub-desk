import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <div className="mt-24">
      <section className="flex h-[calc(100vh_-_96px)] items-center justify-center bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="w-[90%] space-y-4 sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
          <Skeleton className="m-auto" width={240} height={32} />
          <Skeleton className="w-full" height={144} />
          <Skeleton className="m-auto w-6/12" height={48} />
        </div>
      </section>
      <section className="space-y-6 bg-gradient-to-t from-grey-550 to-grey-500 py-14">
        <Skeleton className="m-auto" height={32} width={244} />
        <div className="flex w-full grow-[1] basis-0 flex-wrap gap-6 p-6">
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
          <Skeleton height={220} className="min-w-[290px] flex-1" />
        </div>
      </section>
    </div>
  )
}

export default Loading
