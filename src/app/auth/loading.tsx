import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <>
      <header className="flex flex-col gap-y-1">
        <Skeleton className="max-w-[140px]" height={36} />
        <Skeleton className="max-w-[340px]" height={20} />
      </header>
      <div className="space-y-8 pt-12">
        <Skeleton height={52} />
        <Skeleton height={52} />
        <Skeleton height={52} />
        <Skeleton width={180} height={24} />
      </div>
    </>
  )
}

export default Loading
