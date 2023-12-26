/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import CardDesk from '@/components/cardDesk'
import { DeskProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import Skeleton from '@/components/Layout/skeleton'
import clsx from 'clsx'

type CarouselProps = {
  category: string
  className?: string
}

const Carousel = ({ category, className }: CarouselProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [desks, setDesks] = useState<DeskProps[]>([])

  useEffect(() => {
    const getDesks = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/desks/getWithCategory?category=${category}`,
          { cache: 'no-store' },
        )

        const data = await response.json()

        setDesks(data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getDesks()
  }, [])

  return (
    <div className={clsx('w-full', className)}>
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
        className="!pb-10"
      >
        {isLoading ? (
          <>
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
          </>
        ) : (
          desks?.map((desk) => (
            <SwiperSlide key={desk.id}>
              <CardDesk
                className="!w-full max-w-none"
                data={desk}
                href={`/desk/${desk.id}`}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  )
}

export default Carousel
