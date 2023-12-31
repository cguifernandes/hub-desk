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
            {Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative flex h-[640px] !w-full max-w-none flex-col justify-between rounded-md border-2 border-grey-400 bg-desk-gradient p-7 shadow-md">
                  <div className="flex w-full flex-col items-center space-y-1">
                    <Skeleton className="w-full" height={28} />
                    <Skeleton width={60} height={24} />
                  </div>
                  <Skeleton
                    className="w-full"
                    height={index === 2 ? 90 : index === 3 ? 32 : 64}
                  />
                  <div className="flex flex-wrap justify-between gap-2 pt-8 text-xs text-white">
                    <Skeleton width={120} height={32} />
                    <Skeleton width={210} height={32} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          desks.map((desk) => (
            <SwiperSlide key={desk.id}>
              <CardDesk
                className="!w-full max-w-none"
                data={desk}
                href={`/desk/${desk.id}`}
                comments={desk._count?.comments}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  )
}

export default Carousel
