/* eslint-disable @next/next/no-img-element */
'use client'
import { FakeRDeskProps } from '@/utils/type'
import Heading from '../components/Typography/heading'
import Text from '../components/Typography/text'
import Button from '../components/button'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import DeskWrapper from './Wrapper/deskWrapper'

type FakeDeskProps = {
  className?: string
  delay?: boolean
  data: FakeRDeskProps | undefined
  authorId?: string | undefined
  createdAt?: Date
}

const FakeDesk = ({
  data,
  className,
  delay,
  authorId,
  createdAt,
}: FakeDeskProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'keyframes', delay: delay ? 0.4 : 0, duration: 0.4 }}
      className={clsx(
        'flex flex-col justify-between rounded-md border p-7',
        'border-grey-400 bg-desk-gradient  shadow-md',
        className,
      )}
    >
      {data?.src && (
        <div className="absolute left-0 top-0 h-28 w-full">
          <img
            className="h-full w-full overflow-clip rounded-t-md object-cover object-top align-top"
            alt="Imagem da desk"
            src={
              data?.src.includes('desk/')
                ? `https://kyrsnctgzdsrzsievslh.supabase.co/storage/v1/object/public/hub-desk/${data.src}`
                : data.src
            }
          />
          <div className="absolute top-0 h-full w-full bg-gradient-to-b from-transparent to-grey-600"></div>
        </div>
      )}
      <div
        style={{ marginTop: data?.src ? 60 : 0 }}
        className="z-10 flex flex-col items-center space-y-1 text-center"
      >
        <Heading
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
          size="md"
        >
          {data?.title}
        </Heading>
        <Text className="text-white/50">{data?.category}</Text>
      </div>
      <Text className="break-words text-center">{data?.description}</Text>
      {data?.category === 'Sites' && (
        <div className="flex flex-col gap-6">
          <Button
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            fill="empty"
            text="Repositório"
          />
          <Button
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            text="Site"
          />
        </div>
      )}
      {authorId && createdAt && (
        <DeskWrapper authorId={authorId} createdAt={createdAt} />
      )}
    </motion.div>
  )
}

export default FakeDesk
