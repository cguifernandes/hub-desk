import { z } from 'zod'
import { allowedImageTypes } from '../constant'

export const schemaAccount = z.object({
  email: z
    .string()
    .email('O e-mail precisa ser válido.')
    .nonempty('Este campo é obrigatório.'),
  user: z
    .string()
    .nonempty('Este campo é obrigatório.')
    .refine(
      (userName) => !/\s/.test(userName),
      'Este campo não pode conter espações vazios',
    )
    .refine(
      (userName) => /^[A-Za-z0-9._]+$/.test(userName),
      'Este campo só pode conter letras, números, "." e "_"',
    ),
  pfp: z
    .any()
    .transform((file) => file[0])
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      'A imagem deve ter no máximo 5Mb.',
    )
    .refine((file) => {
      return allowedImageTypes.includes(file?.type)
    }, 'O tipo do arquivo não é válido.'),
})

export type AccountProps = z.infer<typeof schemaAccount>
