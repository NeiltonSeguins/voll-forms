import { z } from "zod";

export const esquemaCadastroEspecialista = z.object({
  crm: z.string().min(1, "O campo não pode ser vazio"),
  especialidades: z.array(
    z.object({
      especialidade: z.string().min(1, "Preencha a sua especialidade"),
      anoConclusao: z.coerce
        .number({
          errorMap: () => {
            return { message: "Insira um número" };
          },
        })
        .min(1, "Preencha o seu ano de conclusão"),
      instituicaoEnsino: z
        .string()
        .min(1, "Preencha a sua instituição de ensino"),
    })
  ),
});

export const esquemaEspecialistaEndereco = z
  .object({
    endereco: z.object({
      avatar: z.instanceof(FileList).transform((lista) => lista.item(0)!),
      cep: z.string().min(1, "Informe um CEP válido"),
      rua: z.string().min(1, "Informe uma Rua válida"),
      numero: z.coerce.number().min(1, "Informe um número"),
      bairro: z.string().min(1, "Informe um Bairro válido"),
      localidade: z.string().min(1, "Informe uma Localidade válida"),
    }),
  })
  .transform((field) => ({
    endereco: {
      avatar: field.endereco.avatar,
      cep: field.endereco.cep,
      rua: field.endereco.rua,
      numero: field.endereco.numero,
      bairro: field.endereco.bairro,
      localidade: field.endereco.localidade,
    },
  }));
