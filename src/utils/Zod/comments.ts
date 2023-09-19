import { z } from 'zod'

export const schemaComment = z.object({
  text: z
    .string()
    .min(32, 'O comentário precisa conter pelo menos 32 caracteres.')
    .nonempty('Esse campo não pode ser vázio.'),
})

export type CommentZodProps = z.infer<typeof schemaComment>
