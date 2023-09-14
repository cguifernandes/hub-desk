import Link from 'next/link'
import Heading from './Typography/heading'
import Text from './Typography/text'

type EmptyAlertProps = {
  message: string
}

const EmptyAlert = ({ message }: EmptyAlertProps) => {
  return (
    <div className="mt-8 flex items-center justify-center px-10 sm:mt-14">
      <div className="space-y-6">
        <div className="space-y-1 text-center">
          <Heading size="md" className="text-white">
            {message}
          </Heading>
          <Text className="text-white/50">
            <Link
              href={'/post-desk'}
              className="text-sky-600 transition-colors hover:text-sky-700"
            >
              Clique aqui
            </Link>{' '}
            para criar uma nova desk
          </Text>
        </div>
      </div>
    </div>
  )
}

export default EmptyAlert
