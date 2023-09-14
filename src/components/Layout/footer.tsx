import clsx from 'clsx'
import Text from '@/components/Typography/text'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      className={clsx(
        'flex h-auto flex-col items-center justify-center gap-2 ',
        'px-[60px] py-6 text-center md:h-24 md:flex-row md:justify-between',
      )}
    >
      <div>
        {/*  TODO: Adicionar páginas */}
        <Text size="md">Hub Desk 2023 ©</Text>
      </div>
      <div>
        <Text>
          Desenvolvido por{' '}
          <Link
            target="_blank"
            className="transition-colors hover:text-grey-200"
            href="https://guifernandes.vercel.app"
          >
            GuilhermeFAZER SITES DE NAVEGHACAO Fernandes
          </Link>
        </Text>
      </div>
    </footer>
  )
}

export default Footer
