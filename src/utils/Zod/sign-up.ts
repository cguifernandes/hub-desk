import { z } from 'zod'

export const schemaSignUp = z.object({
  name: z
    .string()
    .nonempty('O campo "User" é obrigatório.')
    .toLowerCase()
    .max(16, 'O user deve ter no máximo 16 caracteres')
    .refine(
      (user) =>
        /^[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(user.charAt(0)) === false,
      'O user não deve começar com um caractere especial.',
    ),
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

export type SignUpProps = z.infer<typeof schemaSignUp>
