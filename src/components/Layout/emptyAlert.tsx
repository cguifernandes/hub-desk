import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'

type EmptyAlertProps = {
  message: string
  submessage: string
}

const EmptyAlert = ({ message, submessage }: EmptyAlertProps) => {
  return (
    <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
      <div className="space-y-1 text-center">
        <Heading size="md" className="text-white">
          {message}
        </Heading>
        <Text className="text-sm text-white/50">{submessage}</Text>
      </div>
    </div>
  )
}

export default EmptyAlert
