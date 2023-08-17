import Text from './text'

const Footer = () => {
  return (
    <footer className="flex h-auto flex-col items-center justify-center gap-2 border-t-2 border-t-grey-400 px-[60px] py-6 text-center md:h-[10vh] md:flex-row md:justify-between">
      <div>
        {/*  TODO: Adicionar páginas */}
        <Text size="md">Hub Desk 2023 ©</Text>
      </div>
      <div>
        <Text>
          Desenvolvido por{' '}
          <a
            className="transition-colors hover:text-grey-200"
            href="https://portfolio-enzosylvestrin.vercel.app"
          >
            Enzo Sylvestrin
          </a>{' '}
          e{' '}
          <a
            className="transition-colors hover:text-grey-200"
            href="https://guifernandes.vercel.app"
          >
            Guilherme Fernandes
          </a>
        </Text>
      </div>
    </footer>
  )
}

export default Footer