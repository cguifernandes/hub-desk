import Link from 'next/link'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'

type EmptyAlertProps = {
  message: string
}

const EmptyAlert = ({ message }: EmptyAlertProps) => {
  return (
    <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
      <div className="space-y-1 text-center">
        <Heading size="md" className="text-white">
          {message}
        </Heading>
        <Text className="text-white/50 text-sm">
          <Link href={'/post-desk'} className="gradient-text">
            Clique aqui
          </Link>{' '}
          para criar uma nova desk
        </Text>
      </div>
    </div>
  )
}

export default EmptyAlert
