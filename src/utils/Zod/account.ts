import { z } from 'zod'

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
})

export type AccountProps = z.infer<typeof schemaAccount>
