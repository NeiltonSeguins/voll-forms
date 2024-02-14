import { SubmitHandler, useForm } from "react-hook-form";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

const esquemaCadastro = z
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
    telefone: z.string(),
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

type esquemaCadastroTipos = z.infer<typeof esquemaCadastro>;

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<esquemaCadastroTipos>({
    mode: "all",
    resolver: zodResolver(esquemaCadastro),
  });

  const aoSubmeter: SubmitHandler<esquemaCadastroTipos> = (dados) => {
    console.log(dados);

    proximaEtapa();
  };

  return (
    <>
      <h2 className="titulo">Insira alguns dados básicos:</h2>
      <form
        className="formulario__paciente"
        onSubmit={handleSubmit(aoSubmeter)}
      >
        <CampoDigitacao
          id="campo-nome"
          legenda="Nome"
          type="text"
          placeholder="Digite seu nome completo"
          error={errors.nome}
          {...register("nome")}
        />
        <CampoDigitacao
          id="campo-email"
          legenda="Email"
          type="email"
          placeholder="Insira seu endereço de email"
          error={errors.email}
          {...register("email")}
        />
        <CampoDigitacao
          id="campo-telefone"
          legenda="Telefone"
          type="text"
          placeholder="Ex: (DDD) XXXXX-XXXX"
          error={errors.telefone}
          {...register("telefone")}
        />
        <CampoDigitacao
          id="campo-senha"
          legenda="Crie uma senha"
          type="password"
          placeholder="Digite sua senha"
          error={errors.senha}
          {...register("senha")}
        />
        <CampoDigitacao
          id="campo-senha-confirmacao"
          legenda="Repita a senha anterior"
          type="password"
          placeholder="Repita a senha"
          error={errors.senhaVerificada}
          {...register("senhaVerificada")}
        />
        <Botao type="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
