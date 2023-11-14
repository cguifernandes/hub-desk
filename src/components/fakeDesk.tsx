/* eslint-disable @next/next/no-img-element */
'use client'
import { FakeRDeskProps } from '@/utils/type'
import Heading from '../components/Typography/heading'
import Text from '../components/Typography/text'
import Button from '../components/button'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type FakeDeskProps = {
  className?: string
  delay?: boolean
  data: FakeRDeskProps
}

const FakeDesk = ({ data, className, delay }: FakeDeskProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'keyframes', delay: delay ? 0.4 : 0 }}
      className={clsx(
        'flex h-[530px] flex-col justify-between rounded-md border-2 p-7',
        'bg-desk-gradient w-[420px] border-grey-400 transition-colors',
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-1 text-center">
        <Heading
          className="w-8/12 overflow-hidden text-ellipsis whitespace-nowrap"
          size="md"
        >
          {data.title}
        </Heading>
        <Text className="text-white/50">{data.category}</Text>
      </div>
      <img alt="Imagem da desk" src={data.src} />
      <Text className="w-full break-words text-center">{data.description}</Text>
      {data.category === 'Sites' && (
        <div className="flex flex-col gap-6">
          <Button
            target="_blank"
            deskButton
            onClick={(e) => e.stopPropagation()}
            fill="empty"
            text="Repositório"
          />
          <Button
            target="_blank"
            deskButton
            onClick={(e) => e.stopPropagation()}
            text="Site"
          />
        </div>
      )}
    </motion.div>
  )
}

export default FakeDesk
