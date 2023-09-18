/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'
import '@/css/swiper.css'
import '@/css/navigation.css'
import '@/css/pagination.css'
import CardDesk from './Client/Dashboard/cardDesk'
import { RDeskProps } from '@/utils/type'
import { useEffect, useState } from 'react'
import EmptyAlert from '@/components/Layout/emptyAlert'
import Skeleton from '@/components/Layout/skeleton'

const Carousel = ({ category }: { category: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [desks, setDesks] = useState<RDeskProps[]>([])

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

  if (desks.length === 0 && !isLoading) {
    return <EmptyAlert message="Não existe nenhuma Desk com esta categoria." />
  }

  return (
    <div className="w-full px-4 py-10 md:p-10">
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
          ))
        )}
      </Swiper>
    </div>
  )
}

export default Carousel
