import { z } from 'zod'

export const schemaSignUp = z.object({
  name: z
    .string()
    .max(18, 'O nome deve conter no máximo 18 caracteres')
    .nonempty('O campo "Nome" é obrigatório.')
    .refine(
      (name) => !/\s/.test(name),
      'O campo "Nome" não pode conter espações vazios',
    ),
  email: z
    .string()
    .email('O e-mail precisa ser válido.')
    .nonempty('O campo "E-mail" é obrigatório.'),
  password: z
    .string()
    .min(6, 'A senha precisa conter 6 caracteres.')
    .max(12, 'A senha deve conter no máximo 12 caracteres.')
    .nonempty('O campo "Senha" é obrigatório.')
    .refine(
      (password) => /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
      'A senha deve incluir pelo menos um caractere especial.',
    )
    .refine(
      (password) => !/\s/.test(password),
      'O campo "Senha" não pode conter espações vazios',
    ),
})

export type SignUpProps = z.infer<typeof schemaSignUp>
