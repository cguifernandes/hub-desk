import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <main className="pt-24">
      <section className="bg-gradient-to-b from-grey-550 to-grey-500">
        <div className="flex items-center justify-center">
          <div className="flex w-full max-w-[800px] flex-col items-center gap-y-1 py-16">
            <Skeleton className="w-10/12" height={28} />
            <Skeleton className="w-4/12" height={28} />
          </div>
        </div>
        <div className="flex items-center justify-around py-12">
          <div className="flex-[0.40] space-y-8">
            <Skeleton height={60} className="w-full" />
            <Skeleton height={60} className="w-full" />
            <Skeleton height={60} className="w-full" />
            <Skeleton height={192} className="w-full" />
            <Skeleton height={48} className="w-full" />
          </div>
          <div className="flex flex-[0.40] justify-center">
            <div className="h-[700px] w-[500px] border border-white"></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Loading
