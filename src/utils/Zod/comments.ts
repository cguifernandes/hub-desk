import { z } from 'zod'

export const schemaComment = z.object({
  text: z.string().nonempty('Esse campo não pode ser vázio.'),
})

export type CommentZodProps = z.infer<typeof schemaComment>
