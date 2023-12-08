import AnimationWrapper from '@/components/animationWrapper'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

export const Toast = (message: string) => {
  return toast.custom((t) => (
    <AnimationWrapper
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${
        t.visible ? 'opacity-100' : 'opacity-0'
      } flex items-center gap-x-3 rounded-md bg-sky-gradient px-4 py-3 shadow-md`}
    >
      <button onClick={() => toast.dismiss(t.id)}>
        <X size={26} strokeWidth={1.5} color="#fff" />
      </button>
      <div className="h-8 w-[2px] bg-white" />
      <span className="text-white">{message}</span>
    </AnimationWrapper>
  ))
}