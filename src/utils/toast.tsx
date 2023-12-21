import AnimationWrapper from '@/components/Wrapper/animationWrapper'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

export const Toast = (message: string) => {
  return toast.custom(
    (t) => (
      <AnimationWrapper
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundImage:
            'linear-gradient(91deg, rgba(3, 105, 161, 0.7) 0%, rgba(3, 105, 161, 0.7) 0%, rgba(2, 75, 114, 0.7) 100%)',
        }}
        className={`${
          t.visible ? 'opacity-100' : 'opacity-0'
        } bg-toast-gradient flex items-center gap-x-3 rounded-md p-4 shadow-xl backdrop-blur-md`}
      >
        <button onClick={() => toast.dismiss(t.id)}>
          <X size={26} strokeWidth={1.5} color="#fff" />
        </button>
        <div style={{ width: 1 }} className="h-full bg-white" />
        <span className="text-white">{message}</span>
      </AnimationWrapper>
    ),
    {
      position: 'top-right',
    },
  )
}
