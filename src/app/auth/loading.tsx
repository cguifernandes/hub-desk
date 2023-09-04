import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <>
      <Skeleton className="m-auto" height={58} width={290} />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-600 p-10 shadow-lg">
          <header className="flex flex-col gap-y-1">
            <Skeleton width={140} height={36} />
            <Skeleton width={340} height={26} />
          </header>
          <div className="space-y-8 pt-12">
            <Skeleton height={52} />
            <Skeleton height={52} />
            <Skeleton height={48} />
            <Skeleton height={24} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
