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
    .max(24, 'Número máximo de caracteres foi excedido.')
    .nonempty('O campo "Título" é obrigatório.')
    .trim(),
  description: z
    .string()
    .trim()
    .max(124, 'Número máximo de caracteres foi excedido.')
    .nonempty('O campo "Descrição" é obrigatório.'),
  repo: z.union([z.literal(''), z.string().trim().url()]),
  website: z.union([z.literal(''), z.string().trim().url()]),
})

export type DeskProps = z.infer<typeof schemaDesk>
