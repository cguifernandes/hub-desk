/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
'use client'
import ConfirmPassword from '@/components/Layout/confirmPassword'
import Heading from '@/components/Typography/heading'
import { ClientsProps } from '@/utils/type'
import { useState } from 'react'
import FormAccount from '../Form/Settings/formAccount'
import Text from '../Typography/text'
import Button from '../button'
import { api } from '@/utils/api'
import useClient from '@/hooks/useClient'
import { Toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import DeleteModal from '../Modal/DeleteAccount/deleteAccount'

const AccountWrapper = ({ client }: { client: ClientsProps[] }) => {
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { user_session } = useClient()

  const handlerDeleteAccount = async () => {
    try {
      setIsLoading(true)
      const { data } = await api.delete(
        `/auth/?id=${user_session}&user=${client[0].user}`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      destroyCookie(null, 'user_session')
      push('/auth/redirect?m=Conta excluída, foi um prazer :)')
      setVisibleModal(false)
    }
  }

  return (
    <>
      {!confirmPassword ? (
        <ConfirmPassword
          user_session={user_session}
          setConfirmPassword={setConfirmPassword}
        />
      ) : (
        <>
          <div className="flex w-full flex-col items-center gap-y-6 border-b-2 border-grey-400 pb-6">
            <Heading size="md">Alterar dados da conta</Heading>
            <FormAccount user_session={user_session} client={client} />
          </div>
          <div className="flex flex-col space-y-6 py-6">
            <div className="flex flex-col items-start justify-center space-y-1 text-left">
              <Heading size="md" className="text-white">
                Excluir conta
              </Heading>
              <Text className="text-white/50">
                Exclua permanentemente sua conta. Uma vez excluídos, os dados
                não podem ser recuperados.
              </Text>
            </div>
            <Button
              onClick={() => setVisibleModal(true)}
              className="w-3/4 !h-auto"
              text="Excluir conta permanentemente"
            />
            <DeleteModal
              loading={isLoading}
              handlerDeleteAccount={handlerDeleteAccount}
              setVisibleModal={setVisibleModal}
              visibleModal={visibleModal}
              text="Tem certeza que deseja deletar sua conta?"
              subtitle="Ao clicar no botão &#34;Confirmar&#34; seus dados serão apagados"
            />
          </div>
        </>
      )}
    </>
  )
}

export default AccountWrapper
