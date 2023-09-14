import Skeleton from '@/components/skeleton'

const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-1 px-10 pt-8 sm:pt-14">
        <Skeleton height={32} width={120} />
        <Skeleton height={24} width={60} />
      </div>
      <div className="flex w-full gap-x-5 p-10">
        <Skeleton width={450} height={590} />
        <Skeleton width={450} height={590} />
        <Skeleton width={450} height={590} />
        <Skeleton width={450} height={590} />
      </div>
    </>
  )
}

export default Loading
