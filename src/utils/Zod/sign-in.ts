import { z } from 'zod'

export const schemaSignIn = z.object({
  rememberUser: z.boolean(),
  email: z
    .string()
    .email('O e-mail precisa ser válido.')
    .nonempty('Este campo é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa conter pelo menos 6 caracteres.')
    .max(12, 'A senha deve conter no máximo 12 caracteres.')
    .nonempty('Este campo é obrigatório.')
    .refine(
      (password) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
      'A senha deve incluir pelo menos um caractere especial.',
    )
    .refine(
      (password) => !/\s/.test(password),
      'Este campo não pode conter espações vazios',
    ),
})

export type SignInProps = z.infer<typeof schemaSignIn>
