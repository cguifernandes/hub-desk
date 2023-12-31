import { z } from 'zod'
import { allowedImageTypes } from '../constant'

export const schemaDesk = z.object({
  category: z.enum([
    'Geek',
    'Desenhos',
    'Filmes',
    'Jogos',
    'Outros',
    'Séries',
    'Sites',
  ]),
  title: z.string().nonempty('Este campo é obrigatório.').trim(),
  description: z
    .string()
    .trim()
    .min(32, 'A descrição precisa conter pelo menos 32 caracteres.')
    .nonempty('Este campo é obrigatório.'),
  repo: z.union([z.literal(''), z.string().trim().url('URL inválida.')]),
  website: z.union([z.literal(''), z.string().trim().url('URL inválida.')]),
  visibility: z.enum(['Público', 'Privado']).optional().default('Público'),
  image: z
    .any()
    .transform((file) => file[0])
    .refine(
      (file) => file === undefined || file?.size <= 5 * 1024 * 1024,
      'A imagem deve ter no máximo 5Mb.',
    )
    .refine(
      (file) => file === undefined || allowedImageTypes.includes(file?.type),
      'O tipo do arquivo não é válido.',
    ),
})

export type DeskProps = z.infer<typeof schemaDesk>
