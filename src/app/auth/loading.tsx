import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <div className=" w-full max-w-[550px] rounded-md bg-grey-600 p-10 shadow-lg">
      <header className="flex flex-col gap-y-1">
        <Skeleton width={140} height={36} />
        <Skeleton width={340} height={26} />
      </header>
      <div className="space-y-8 py-12">
        <Skeleton height={52} />
        <Skeleton height={52} />
        <Skeleton height={48} />
        <Skeleton height={24} />
      </div>
      <div className="h-[2px] w-full bg-grey-400" />
      <div className="grid grid-cols-2 grid-rows-2 justify-between justify-items-center gap-5 pt-12 sm:grid-cols-4 sm:grid-rows-1">
        <Skeleton width={96} height={64} />
        <Skeleton width={96} height={64} />
        <Skeleton width={96} height={64} />
        <Skeleton width={96} height={64} />
      </div>
    </div>
  )
}

export default Loading
