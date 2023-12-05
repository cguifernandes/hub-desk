import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <>
      <Skeleton className="m-auto" height={36} width={210} />
      <div className="mt-8 flex items-center justify-center sm:mt-14">
        <div className="w-full max-w-[550px] rounded-md bg-grey-gradient p-10 shadow-lg">
          <header className="flex flex-col gap-y-1">
            <Skeleton width={140} height={36} />
            <Skeleton width={340} height={20} />
          </header>
          <div className="space-y-8 pt-12">
            <Skeleton height={52} />
            <Skeleton height={52} />
            <Skeleton height={52} />
            <Skeleton height={48} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
