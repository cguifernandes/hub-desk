import { Modal } from '@/components/Modal'
import Heading from '@/components/Typography/heading'
import Text from '@/components/Typography/text'
import Button from '@/components/button'
import { Dispatch, SetStateAction } from 'react'

type DeleteModalProps = {
  visibleModal: boolean
  setVisibleModal: Dispatch<SetStateAction<boolean>>
  handlerDeleteAccount: () => Promise<void>
  loading: boolean
}

const DeleteModal = ({
  visibleModal,
  setVisibleModal,
  handlerDeleteAccount,
  loading,
}: DeleteModalProps) => {
  return (
    <>
      {visibleModal && (
        <Modal.Root
          className="items-center justify-center"
          visibleModal={visibleModal}
        >
          <Modal.Overlay
            className="flex items-center justify-center"
            visibleModal={visibleModal}
            onClick={() => setVisibleModal(false)}
          />
          <Modal.Children className="z-30 ml-4 mr-7 flex w-full max-w-[700px] flex-col justify-between gap-y-6 rounded-md bg-modal-gradient p-6 py-10 backdrop-blur-md sm:h-full sm:max-h-[250px]">
            <Modal.Header className="flex flex-col items-center justify-center space-y-1 px-4 text-center">
              <Heading size="md" className="text-white">
                Tem certeza que deseja deletar sua conta?
              </Heading>
              <Text className="text-white/50">
                Ao clicar no botão &#34;Confirmar&#34; seus dados serão apagados
              </Text>
            </Modal.Header>
            <div className="flex flex-col justify-evenly gap-y-6 sm:flex-row">
              <Button className="w-full sm:w-60" text="Cancelar" fill="empty" />
              <Button
                onClick={handlerDeleteAccount}
                loading={loading}
                className="w-full sm:w-60"
                text="Confirmar"
                fill="alert"
              />
            </div>
          </Modal.Children>
        </Modal.Root>
      )}
    </>
  )
}

export default DeleteModal
