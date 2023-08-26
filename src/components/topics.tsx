import { ExternalLink } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'
import { ButtonHTMLAttributes } from 'react'
import Heading from './Typography/heading'

const topics = tv({
  base: 'rounded-md bg-sky-700 transition-colors hover:bg-sky-800 ',
  variants: {
    component: {
      button: 'flex items-center justify-between w-full px-6 py-3',
      topics: [
        'relative flex h-[220px] items-center justify-center',
        'sm:flex-[33.33%] lg:flex-[20%] shadow-lg flex-[50%]',
      ],
    },
  },
  defaultVariants: {
    component: 'topics',
  },
})

type TopicsProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof topics> & {
    text: string
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xlg' | 'base'
  }

const Topics = ({ className, text, component, size = 'md' }: TopicsProps) => {
  return (
    <button className={topics({ component, className })}>
      <Heading size={size} align="center" className="font-montserrat">
        {text}
      </Heading>
      {component === 'button' ? (
        <ExternalLink color="#fff" />
      ) : (
        <span className="absolute bottom-6 right-6 flex items-center text-sm text-white">
          Ver mais <ExternalLink size={20} className="ml-2" />
        </span>
      )}
    </button>
  )
}

export default Topics
