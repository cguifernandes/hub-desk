/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Form } from '@/components/Form'
import { DeskProps, schemaDesk } from '@/utils/Zod/desk'
import { api } from '@/utils/api'
import { ErrorToast, SuccessToast } from '@/utils/toast'
import { ResponseProps } from '@/utils/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Github, Globe, Subtitles } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import useClient from '@/hooks/useClient'

const FormDesk = () => {
  const [selectedDropDown, setSelectedDropDown] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user_session } = useClient()
  const isVisibleRepoWebsite = selectedDropDown === 'Sites'
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DeskProps>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaDesk),
  })

  const animationVisibleRepoWebsite = isVisibleRepoWebsite
    ? { opacity: 1 }
    : { opacity: 0, display: 'none' }

  const handlerFormSubmit = async (desk: DeskProps) => {
    try {
      setIsLoading(true)
      const { data }: { data: ResponseProps } = await api.post(
        `/desks?id=${user_session}`,
        JSON.stringify(desk),
        { headers: { 'Content-Type': 'application/json' } },
      )

      if (data.error) {
        ErrorToast(data.error)
      } else {
        SuccessToast(data.success)
        reset()
        setSelectedDropDown('')
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form.Root
      className="w-10/12 space-y-8 lg:w-8/12 xl:w-6/12"
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
      <Form.Select
        error={errors.category}
        setValue={setValue}
        placeholder="Categoria*"
        setSelectedDropDown={setSelectedDropDown}
        selectedDropDown={selectedDropDown}
      >
        <ChevronDown color="#fff" strokeWidth={1.5} size={30} />
      </Form.Select>
      <Form.Textarea
        error={errors.description}
        name="description"
        register={register}
        placeholder="Descrição*"
      />
      <motion.div className="space-y-8" animate={animationVisibleRepoWebsite}>
        <Form.Input
          error={errors.repo}
          register={register}
          name="repo"
          placeholder="Repositório"
        >
          <Github color="#fff" strokeWidth={1.5} size={30} />
        </Form.Input>
        <Form.Input
          error={errors.website}
          register={register}
          name="website"
          placeholder="Site"
        >
          <Globe color="#fff" strokeWidth={1.5} size={30} />
        </Form.Input>
      </motion.div>
      <Form.Button
        loading={isLoading}
        type="submit"
        text="Criar uma desk"
        className="w-full"
      />
    </Form.Root>
  )
}

export default FormDesk
