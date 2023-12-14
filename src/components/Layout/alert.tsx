import Link from 'next/link'
import Heading from '../Typography/heading'
import Text from '../Typography/text'

const Alert = () => {
  return (
    <div className="flex flex-col items-center justify-center px-10 pt-8 sm:pt-14">
      <Heading size="md" align="center">
        Parece que você não está logado
      </Heading>
      <Text className="text-white/50">
        Para acessar essa página, você precisa estar logado em uma conta válida{' '}
        <Link className="gradient-text" href="/auth/login">
          Clique aqui
        </Link>{' '}
        para fazer o login
      </Text>
    </div>
  )
}

export default Alert
