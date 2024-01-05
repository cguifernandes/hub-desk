import { z } from 'zod'

export const schemaComment = z.object({
  text: z
    .string()
    .min(16, 'Esse campo não pode ter menos de 16 caracteres')
    .nonempty('Esse campo não pode ser vázio.'),
})

export type CommentZodProps = z.infer<typeof schemaComment>
