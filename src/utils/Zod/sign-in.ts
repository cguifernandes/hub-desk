import { z } from 'zod'

export const schemaSignIn = z.object({
  rememberUser: z.boolean(),
  email: z
    .string()
    .email('O e-mail precisa ser válido.')
    .nonempty('O campo "E-mail" é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa ter 6 caracteres.')
    .max(12, 'A senha deve ter no máximo 12 caracteres.')
    .nonempty('O campo "Senha" é obrigatório.')
    .refine(
      (password) => /[A-Z]/.test(password),
      'A senha deve ter uma letra maiúscula.',
    )
    .refine(
      (password) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
      'A senha deve incluir pelo menos um caractere especial.',
    ),
})

export type SignInProps = z.infer<typeof schemaSignIn>
