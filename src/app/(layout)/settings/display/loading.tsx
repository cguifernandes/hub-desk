import Skeleton from '@/components/Layout/skeleton'

const Loading = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-y-6 sm:flex-row">
      <div className="w-full space-y-2 sm:w-8/12 sm:pr-8">
        <Skeleton height={29} width={190} />
        <Skeleton height={120} className="w-full" />
      </div>
      <Skeleton height={50} className="w-full sm:w-64" />
    </div>
  )
}

export default Loading
