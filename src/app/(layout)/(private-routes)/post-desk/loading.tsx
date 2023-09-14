import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_192px)] flex-col items-center bg-gradient-to-b from-grey-550 to-grey-500">
      <div className="w-[90%] space-y-2 py-16 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
        <Skeleton className="m-auto w-10/12" height={28} />
        <Skeleton className="m-auto w-4/12" height={24} />
      </div>
      <div className="w-10/12 space-y-8 lg:w-8/12 xl:w-6/12">
        <Skeleton height={60} className="w-full" />
        <Skeleton height={60} className="w-full" />
        <Skeleton height={192} className="w-full" />
        <Skeleton height={48} className="w-full" />
      </div>
    </section>
  )
}

export default Loading
