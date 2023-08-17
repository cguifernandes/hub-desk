import { X } from 'lucide-react'
import Button from '../button'
import Text from '../text'
import clsx from 'clsx'

/* eslint-disable react/no-unescaped-entities */
const CookiesMessage = () => {
  return (
    <div
      className={clsx(
        'fixed bottom-0 right-0 m-8 flex max-w-[320px] flex-col items-center md:bottom-8 md:right-8',
        'justify-between rounded-lg bg-grey-600 p-10 pt-12 md:w-[690px] md:flex-row md:px-10 md:py-4',
      )}
    >
      <button className="group absolute right-4 top-4">
        <X
          className="text-white transition-colors group-hover:text-white/60"
          size={32}
        />
      </button>
      <Text
        align="center"
        className="pb-6 text-lg md:p-8 md:pl-0 md:!text-left"
      >
        Utilizamos cookies para aprimorar a sua experiência de navegação,
        oferecer anúncios ou conteúdo personalizado e analisar o nosso tráfego.
        Ao clicar em "Aceitar todos", você consente com o nosso uso de cookies.
      </Text>
      <div className="flex flex-col justify-evenly gap-y-8">
        <Button text="Aceitar todos" className="w-52" />
        <Button text="Negador todos" fill="empty" className="w-52" />
      </div>
    </div>
  )
}

export default CookiesMessage
