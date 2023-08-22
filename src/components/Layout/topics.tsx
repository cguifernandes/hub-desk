import { ArrowUpRightIcon } from 'lucide-react'
import Text from '@/components/text'
import clsx from 'clsx'

type TopicsProps = {
  text: string
  className?: string
}

const Topics = ({ className, text }: TopicsProps) => {
  return (
    <div
      className={clsx(
        'relative flex h-[220px] cursor-pointer items-center justify-center rounded-md shadow-lg',
        'flex-[50%] bg-sky-700 transition-colors hover:bg-sky-800 sm:flex-[33.33%] lg:flex-[20%]',
        className,
      )}
    >
      <Text align="center" className="font-montserrat !text-xl">
        {text}
      </Text>
      <span className="absolute bottom-6 right-6 flex items-center text-sm text-white">
        Ver mais <ArrowUpRightIcon size={20} className="mx-1" />
      </span>
    </div>
  )
}

export default Topics
