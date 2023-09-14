import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import Skeleton from '@/components/skeleton'
import LoadingComponent from '@/components/loading'

const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-1 px-10 pt-8 sm:pt-14">
        <Skeleton height={32} width={120} />
        <Skeleton height={24} width={60} />
      </div>
      <div className="flex w-full flex-1 items-center justify-center px-4 py-10 md:p-10">
        <LoadingComponent className="w-24" />
      </div>
    </>
  )
}

export default Loading
