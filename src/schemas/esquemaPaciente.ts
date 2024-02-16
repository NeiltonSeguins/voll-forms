import { z } from "zod";

export const esquemaPacienteCadastro = z
  .object({
    nome: z.string().min(5, "O nome deve ter pelo menos cinco caracteres"),
    email: z
      .string()
      .min(1, "Campo de email obrigatório")
      .email("O email não é válido")
      .transform((val) => val.toLocaleLowerCase())
      .refine((email) => {
        return email.endsWith("@voll.com.br");
      }, "O email deve ser institucional da VollMed"),
    telefone: z
      .string()
      .regex(
        /^\(\d{2,3}\) \d{5}-\d{4}$/,
        "O telefone está no formato incorreto"
      ),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    senhaVerificada: z.string().min(1, "Este campo não pode ser vazio"),
  })
  .superRefine(({ senhaVerificada, senha }, ctx) => {
    if (senhaVerificada !== senha) {
      ctx.addIssue({
        code: "custom",
        message: "A senhas não coincidem",
        path: ["senhaVerificada"],
      });
    }
  });
