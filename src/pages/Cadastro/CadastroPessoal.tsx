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
      .transform((val) => val.toLocaleLowerCase()),
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

type esquemaCadastroProps = z.infer<typeof esquemaCadastro>;

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<esquemaCadastroProps>({
    mode: "all",
    resolver: zodResolver(esquemaCadastro),
  });

  const aoSubmeter: SubmitHandler<esquemaCadastroProps> = (dados) => {
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
          tipo="text"
          placeholder="Digite seu nome completo"
          error={errors.nome}
          {...register("nome")}
        />
        <CampoDigitacao
          id="campo-email"
          legenda="Email"
          tipo="email"
          placeholder="Insira seu endereço de email"
          error={errors.email}
          {...register("email")}
        />
        <CampoDigitacao
          id="campo-telefone"
          legenda="Telefone"
          tipo="text"
          placeholder="Ex: (DDD) XXXXX-XXXX"
          error={errors.telefone}
          {...register("telefone")}
        />
        <CampoDigitacao
          id="campo-senha"
          legenda="Crie uma senha"
          tipo="password"
          placeholder="Digite sua senha"
          error={errors.senha}
          {...register("senha")}
        />
        <CampoDigitacao
          id="campo-senha-confirmacao"
          legenda="Repita a senha anterior"
          tipo="password"
          placeholder="Repita a senha"
          error={errors.senhaVerificada}
          {...register("senhaVerificada")}
        />
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
