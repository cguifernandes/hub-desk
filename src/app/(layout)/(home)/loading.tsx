'use client'
import Skeleton from '@/components/Layout/skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Autoplay } from 'swiper/modules'

const Loading = () => {
  return (
    <div className="mt-24">
      <section className="m-auto flex h-[calc(100vh_-_80px)] w-full items-center justify-center lg:max-w-[1890px] lg:justify-between lg:px-10 xl:px-16">
        <div className="mx-8 w-full space-y-4 text-center sm:w-[710px] lg:m-0 lg:mr-6 lg:text-left">
          <Skeleton width={240} height={32} />
          <Skeleton className="w-full" height={144} />
          <Skeleton
            className="m-auto flex w-4/5 sm:w-[420px] lg:m-0 lg:w-96"
            height={48}
          />
        </div>
        <div className="relative hidden h-[730px] w-[670px] lg:inline">
          <Skeleton className="absolute bottom-0 left-0 z-10 lg:h-[480px] lg:w-[370px] xl:h-[560px] xl:w-[450px]" />
          <Skeleton className="absolute right-0 top-0 lg:h-[480px] lg:w-[370px] xl:h-[560px] xl:w-[450px]" />
        </div>
      </section>
      <section className="py-14">
        <Skeleton className="m-auto" height={32} width={244} />
        <div className="flex w-full grow-[1] basis-0 flex-wrap">
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
          <div className="w-full space-y-4 px-10 py-6">
            <Skeleton height={32} width={190} />
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default Loading
