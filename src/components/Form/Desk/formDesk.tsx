/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Form } from '@/components/Form'
import { DeskProps, schemaDesk } from '@/utils/Zod/desk'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Image, Subtitles } from 'lucide-react'
import { useForm } from 'react-hook-form'

const FormDesk = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<DeskProps>({
    reValidateMode: 'onBlur',
    resolver: zodResolver(schemaDesk),
  })

  const handlerFormSubmit = async (desk: DeskProps) => {
    console.log(desk)
  }

  return (
    <Form.Root
      className="flex-[0.40] space-y-8"
      handleSubmit={handleSubmit(handlerFormSubmit)}
    >
      <Form.Input
        error={errors.title}
        register={register}
        name="title"
        placeholder="Título*"
      >
        <Subtitles color="#fff" strokeWidth={1.5} size={30} />
      </Form.Input>
      <Form.Input
        error={errors.category}
        register={register}
        name="category"
        placeholder="Categoria*"
      >
        <ChevronDown color="#fff" strokeWidth={1.5} size={30} />
      </Form.Input>
      <Form.Image setValue={setValue} name="image" error={errors.image}>
        <Image color="#fff" strokeWidth={1.5} size={30} />
      </Form.Image>
      <Form.Textarea
        error={errors.description}
        name="description"
        register={register}
        placeholder="Descrição*"
      />
      <Form.Button type="submit" text="Criar uma desk" className="w-full" />
    </Form.Root>
  )
}

export default FormDesk
