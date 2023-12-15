/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Form } from '@/components/Form'
import { DeskProps, schemaDesk } from '@/utils/Zod/desk'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Github, Globe, Image } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useClient from '@/hooks/useClient'
import { supabase } from '../../../../lib/supabase'
import AnimationWrapper from '@/components/Wrapper/animationWrapper'
import { FakeRDeskProps } from '@/utils/type'
import FakeDesk from '@/components/fakeDesk'

const FormDesk = () => {
  const [selectedDropDown, setSelectedDropDown] = useState('')
  const [fileList, setFileList] = useState<File | undefined>(undefined)
  const [fakeData, setFakeData] = useState<FakeRDeskProps | undefined>({
    category: 'Selecione uma categoria',
    description: 'Escreva uma descrição',
    src: '',
    title: 'Escreva um título',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user_session } = useClient()
  const currentDate = new Date()
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

  const handlerFormSubmit = async (desk: DeskProps) => {
    try {
      setIsLoading(true)
      if (desk.image !== undefined) {
        const timestamp = new Date().getTime()
        const storage = await supabase.storage
          .from('hub-desk')
          .upload(`desk/${timestamp}_${desk.image.name}`, desk.image)
        desk.image = storage.data?.path
      } else {
        desk.image = ''
      }

      const { data } = await api.post(`/desks?id=${user_session}`, desk, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        reset()
        setSelectedDropDown('')
        setFileList(undefined)
        setFakeData({
          category: 'Selecione uma categoria',
          description: 'Escreva uma descrição',
          src: '',
          title: 'Escreva um título',
        })
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlerClickSelect = (
    value:
      | 'Animes'
      | 'Desenhos'
      | 'Filmes'
      | 'Jogos'
      | 'Outros'
      | 'Séries'
      | 'Sites',
  ) => {
    setSelectedDropDown(value)
    setValue?.('category', value)
    setFakeData((prevData) => ({
      ...prevData,
      category: value,
    }))
  }

  return (
    <>
      <Form.Root
        className="w-2/5 space-y-8"
        handleSubmit={handleSubmit(handlerFormSubmit)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Form.Input
          error={errors.title}
          register={register}
          name="title"
          placeholder="Título*"
          maxLength={50}
          className="!w-full !rounded-md"
          setFakeData={setFakeData}
        />
        <Form.Select
          error={errors.category}
          placeholder="Categoria*"
          selectedDropDown={selectedDropDown}
          handlerClickSelect={handlerClickSelect}
        />
        <Form.File
          error={errors.image}
          fileList={fileList}
          setFileList={setFileList}
          setFakeData={setFakeData}
          register={register}
        >
          <Image className="absolute right-4" size={22} strokeWidth={1.5} />
        </Form.File>
        <Form.Textarea
          error={errors.description}
          name="description"
          register={register}
          placeholder="Descrição*"
          maxLength={250}
          setFakeData={setFakeData}
        />
        <AnimationWrapper
          className="space-y-8"
          animate={
            isVisibleRepoWebsite
              ? { opacity: 1 }
              : { opacity: 0, display: 'none' }
          }
        >
          <Form.Input
            error={errors.repo}
            register={register}
            name="repo"
            placeholder="Repositório"
          >
            <Github
              className="absolute right-4"
              color="#fff"
              strokeWidth={1.5}
              size={22}
            />
          </Form.Input>
          <Form.Input
            error={errors.website}
            register={register}
            name="website"
            placeholder="Site"
          >
            <Globe
              className="absolute right-4"
              color="#fff"
              strokeWidth={1.5}
              size={22}
            />
          </Form.Input>
        </AnimationWrapper>
        <Form.Button
          loading={isLoading}
          type="submit"
          text="Criar uma desk"
          className="w-full"
        />
      </Form.Root>
      <FakeDesk
        className="relative h-[600px] w-[500px]"
        authorId={user_session}
        createdAt={currentDate}
        data={fakeData}
      />
    </>
  )
}

export default FormDesk
