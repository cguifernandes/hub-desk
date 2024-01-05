import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <section className="flex min-h-[calc(100vh_-_80px_-_64px)] flex-col items-center py-8 lg:py-10">
      <div className="w-[90%] space-y-1 py-16 text-center sm:w-[80%] lg:w-[920px] xl:w-[1020px]">
        <Skeleton className="m-auto w-10/12" height={28} />
        <Skeleton className="m-auto w-4/12" height={24} />
      </div>
      <div className="w-10/12 space-y-8 lg:w-8/12 xl:w-6/12">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className={'100%'}
            height={index === 3 ? 192 : 60}
          />
        ))}
      </div>
    </section>
  )
}

export default Loading
