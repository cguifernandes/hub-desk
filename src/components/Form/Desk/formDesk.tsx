/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import { Form } from '@/components/Form'
import { DeskProps, schemaDesk } from '@/utils/Zod/desk'
import { api } from '@/utils/api'
import { Toast } from '@/utils/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useClient from '@/hooks/useClient'
import { supabase } from '../../../../lib/supabase'
import AnimationWrapper from '@/components/Wrapper/animationWrapper'
import { ClientsProps, FakeRDeskProps } from '@/utils/type'
import FakeDesk from '@/components/fakeDesk'
import { categories, visibility } from '@/utils/constant'
import { useRouter } from 'next/navigation'

const FormDesk = ({ author }: { author: ClientsProps }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedVisibility, setSelectedVisibility] = useState('Público')
  const [fileList, setFileList] = useState<File | undefined>(undefined)
  const [fakeData, setFakeData] = useState<FakeRDeskProps | undefined>({
    category: 'Selecione uma categoria',
    description: 'Escreva uma descrição',
    src: '',
    title: 'Escreva um título',
    repo: '',
    website: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user_session } = useClient()
  const currentDate = new Date()
  const { push } = useRouter()
  const isVisibleRepoWebsite = selectedCategory === 'Sites'
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

      const { data } = await api.post(`/desks?authorId=${user_session}`, desk, {
        headers: { 'Content-Type': 'application/json' },
      })

      if (data.error) {
        Toast(data.error)
      } else {
        Toast(data.success)
        push(`/desk/${data.data.id}`)
        setSelectedCategory('')
        setSelectedVisibility('Público')
        setFileList(undefined)
        reset()
      }
    } catch (err) {
      console.error('Erro ao processar formulário:', err)
    } finally {
      setIsLoading(false)
      setFakeData({
        category: 'Selecione uma categoria',
        description: 'Escreva uma descrição',
        src: '',
        title: 'Escreva um título',
      })
    }
  }

  const handlerClickVisibility = (value: 'Público' | 'Privado') => {
    setSelectedVisibility(value)
    setValue?.('visibility', value)
  }

  const handlerClickCategory = (
    value:
      | 'Geek'
      | 'Desenhos'
      | 'Filmes'
      | 'Jogos'
      | 'Outros'
      | 'Séries'
      | 'Sites',
  ) => {
    setSelectedCategory(value)
    setValue?.('category', value)
    setFakeData((prevData) => ({
      ...prevData,
      category: value,
    }))
  }

  return (
    <div className="flex w-full flex-col items-center justify-evenly gap-y-12 px-4 pb-4 lg:flex-row lg:pb-6">
      <Form.Root
        className="w-full min-w-0 max-w-[630px] space-y-8 sm:min-w-[400px] lg:w-full lg:pr-6"
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
          label="Escreva um título"
          setFakeData={setFakeData}
        />
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <Form.Select
            error={errors.category}
            selectedDropDown={selectedCategory}
            dropDownItems={categories}
            handlerClickSelect={handlerClickCategory}
            label="Escolha uma categoria"
            placeholder="Categoria*"
          />
          <Form.Select
            error={errors.visibility}
            dropDownItems={visibility}
            selectedDropDown={selectedVisibility}
            label="Visibilidade"
            handlerClickSelect={handlerClickVisibility}
            placeholder="Visibilidade"
          />
        </div>
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
          label="Escreva uma descrição"
          setFakeData={setFakeData}
        />
        <AnimationWrapper
          className="flex-col justify-between gap-8 sm:flex-row"
          animate={
            isVisibleRepoWebsite
              ? { opacity: 1, display: 'flex' }
              : { opacity: 0, display: 'none' }
          }
        >
          <Form.Input
            error={errors.repo}
            register={register}
            name="repo"
            placeholder="Repositório"
            className="w-full sm:w-2/4"
            label="Repositório do site"
            setFakeData={setFakeData}
          />
          <Form.Input
            error={errors.website}
            register={register}
            name="website"
            placeholder="Site"
            label="Link do site"
            className="w-full sm:w-2/4"
            setFakeData={setFakeData}
          />
        </AnimationWrapper>
        <Form.Button
          loading={isLoading}
          type="submit"
          text="Criar uma desk"
          className="w-full"
        />
      </Form.Root>
      <FakeDesk
        className="relative h-[600px] w-full min-w-[320px] max-w-[500px] sm:min-w-[460px] lg:w-2/5 lg:max-w-[500px]"
        authorId={user_session}
        createdAt={currentDate}
        comments={0}
        data={fakeData}
        author={author}
      />
    </div>
  )
}

export default FormDesk
