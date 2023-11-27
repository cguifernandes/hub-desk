import clsx from 'clsx'
import Text from '@/components/Typography/text'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      className={clsx(
        'flex h-auto flex-col items-center justify-center gap-2 bg-grey-500/30',
        'px-12 py-6 text-center md:h-16 md:flex-row md:justify-between md:py-0',
      )}
    >
      {/*  TODO: Adicionar páginas */}
      <Text className="text-base">Hub Desk 2023 ©</Text>
      <Text className="text-sm">
        Desenvolvido por{' '}
        <Link
          target="_blank"
          className="gradient-text"
          href="https://guifernandes.vercel.app"
        >
          Guilherme Fernandes
        </Link>
      </Text>
    </footer>
  )
}

export default Footer
