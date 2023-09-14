'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import CardDesk from './Client/Dashboard/cardDesk'
import { RDeskProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import Skeleton from './skeleton'
import EmptyAlert from './emptyAlert'

type CarouselProps = {
  data: RDeskProps[]
}

const Carousel = ({ data }: CarouselProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (data.length === 0) {
    return <EmptyAlert message="Não existe nenhuma Desk com esta categoria." />
  }

  return (
    <>
      {!mounted ? (
        <div className="flex w-full gap-x-5">
          <Skeleton width={450} height={590} />
          <Skeleton width={450} height={590} />
          <Skeleton width={450} height={590} />
          <Skeleton width={450} height={590} />
        </div>
      ) : (
        <Swiper
          speed={200}
          autoplay
          spaceBetween={20}
          modules={[Scrollbar, Autoplay]}
          scrollbar={{ draggable: true }}
          slidesPerView={4}
          className="!px-2 !pb-16"
        >
          {data.map((desk) => (
            <SwiperSlide key={desk.category}>
              <CardDesk
                authorId={desk.authorId}
                href={`/desk/${desk.id}`}
                category={desk.category}
                createdAt={desk.createdAt}
                description={desk.description}
                repo={desk.repo}
                title={desk.title}
                website={desk.website}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default Carousel
