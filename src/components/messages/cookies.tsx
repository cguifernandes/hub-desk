'use client'
import { X } from 'lucide-react'
import Button from '../button'
import Text from '../text'
import clsx from 'clsx'
import { useState } from 'react'
import { motion } from 'framer-motion'

/* eslint-disable react/no-unescaped-entities */
const CookiesMessage = () => {
  const [visible, setVisible] = useState(true)

  return (
    <>
      {visible && (
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'keyframes' }}
          className={clsx(
            'fixed bottom-8 right-8 flex w-[300px] flex-col items-center',
            'justify-between rounded-lg bg-grey-600 px-10 py-8 md:w-[520px]',
          )}
        >
          <button className="group absolute right-4 top-4">
            <X
              onClick={() => setVisible(!visible)}
              className="text-white transition-colors group-hover:text-white/60"
              size={32}
            />
          </button>
          <Text align="center" className="p-6 text-sm">
            Utilizamos cookies para aprimorar a sua experiência de navegação,
            oferecer anúncios ou conteúdo personalizado e analisar o nosso
            tráfego. Ao clicar em "Aceitar todos", você consente com o nosso uso
            de cookies.
          </Text>
          <div className="flex w-full flex-col justify-between gap-y-8 md:flex-row">
            <Button
              onClick={() => setVisible(!visible)}
              text="Aceitar todos"
              className="w-52 text-sm"
            />
            <Button
              onClick={() => setVisible(!visible)}
              text="Negador todos"
              fill="empty"
              className="w-52 text-sm"
            />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default CookiesMessage
