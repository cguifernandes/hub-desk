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
    .nonempty('O campo "Título" é obrigatório.'),
  description: z
    .string()
    .max(124, 'Número máximo de caracteres foi excedido.')
    .nonempty('O campo "Descrição" é obrigatório.'),
  // repo: z
  //   .string()
  //   .regex(/^https:\/\/github\.com\/.*\/.*/, 'URL inválida')
  //   .optional(),
  // website: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (website) => website?.startsWith('https://xvideos'),
  //     'URL inválida',
  //   ),
})

export type DeskProps = z.infer<typeof schemaDesk>
