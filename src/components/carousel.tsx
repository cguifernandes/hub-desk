'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import CardDesk from './Client/Dashboard/cardDesk'
import { RDeskProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import EmptyAlert from './emptyAlert'
import Skeleton from './skeleton'

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
    <div className="w-full px-4 py-10 md:p-10">
      {!mounted ? (
        <Swiper
          speed={200}
          autoplay
          modules={[Scrollbar, Autoplay]}
          spaceBetween={20}
          scrollbar={{ draggable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
            1536: {
              slidesPerView: 4,
            },
          }}
          className="!px-2 !pb-16"
        >
          <SwiperSlide>
            <Skeleton className="w-full" height={590} />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton className="w-full" height={590} />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton className="w-full" height={590} />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton className="w-full" height={590} />
          </SwiperSlide>
        </Swiper>
      ) : (
        <Swiper
          speed={200}
          autoplay
          modules={[Scrollbar, Autoplay]}
          spaceBetween={20}
          scrollbar={{ draggable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
            1536: {
              slidesPerView: 4,
            },
          }}
          className="!px-2 !pb-16"
        >
          {data.map((desk) => (
            <SwiperSlide key={desk.id}>
              <CardDesk
                className="!w-full max-w-none"
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
    </div>
  )
}

export default Carousel
