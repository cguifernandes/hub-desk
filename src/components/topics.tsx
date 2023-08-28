import { ExternalLink } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'
import { ButtonHTMLAttributes } from 'react'

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
  }

const Topics = ({ className, text, component }: TopicsProps) => {
  return (
    <button className={topics({ component, className })}>
      <span className="font-montserrat text-white">{text}</span>
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
