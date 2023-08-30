import { z } from 'zod'

export const schemaDesk = z.object({
  category: z.enum([
    'Animes',
    'Filmes',
    'Desenhos',
    'Sites',
    'Séries',
    'Outros',
  ]),
  title: z.string().max(24, 'Número máximo de caracteres foi excedido.'),
  image: z.string(),
  color: z.string().startsWith('#'),
  describre: z.string().max(124, 'Número máximo de caracteres foi excedido.'),
  repo: z.string().regex(/^https:\/\/github\.com\/.*\/.*/, 'URL inválida'),
  website: z
    .string()
    .refine((website) => website.startsWith('https://xvideos'), 'URL inválida'),
})

export type DeskProps = z.infer<typeof schemaDesk>
