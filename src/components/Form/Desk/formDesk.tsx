import { Form } from '@/components/Form'
import { DeskProps, schemaDesk } from '@/utils/Zod/desk'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const FormDesk = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DeskProps>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaDesk),
  })

  const handlerFormSubmit = async (desk: DeskProps) => {
    console.log(desk)
  }

  return (
    <Form.Root handleSubmit={handleSubmit(handlerFormSubmit)}>
      <p>oi</p>
    </Form.Root>
  )
}

export default FormDesk
