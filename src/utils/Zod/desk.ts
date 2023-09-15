import { z } from 'zod'

export const schemaDesk = z.object({
  category: z.enum([
    'Animes',
    'Desenhos',
    'Filmes',
    'Jogos',
    'Outros',
    'Séries',
    'Sites',
  ]),
  title: z
    .string()
    .max(48, 'Número máximo de caracteres foi excedido.')
    .nonempty('O campo "Título" é obrigatório.')
    .trim(),
  description: z
    .string()
    .trim()
    .min(32, 'A descrição precisa conter pelo menos 32 caracteres.')
    .max(150, 'Número máximo de caracteres foi excedido.')
    .nonempty('O campo "Descrição" é obrigatório.'),
  repo: z.union([z.literal(''), z.string().trim().url()]),
  website: z.union([z.literal(''), z.string().trim().url()]),
})

export type DeskProps = z.infer<typeof schemaDesk>
