import { SubmitHandler, useForm } from "react-hook-form";
import Botao from "../../components/Botao";
import { useEffect } from "react";
import { mascaraTelefone } from "../../utils/mascaras";
import CampoDigitacao from "../../components/CampoDigitacao";
import { validarEmail, validarSenha } from "../../utils/validacoes";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

const esquemaCadastro = z.object({
  nome: z.string().min(5, "O nome deve ter pelo menos cinco caracteres"),
  email: z.string().email("Campo de email obrigatório"),
  telefone: z.string(),
  senha: z.string().min(8),
  senhaVerificada: z.string().min(8),
});

type esquemaCadastroProps = z.infer<typeof esquemaCadastro>;

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<esquemaCadastroProps>({
    resolver: zodResolver(esquemaCadastro),
  });

  const aoSubmeter: SubmitHandler<esquemaCadastroProps> = (dados) => {
    console.log(dados);

    proximaEtapa();
  };

  const senha = watch("senha");
  const telefoneDigitado = watch("telefone");

  useEffect(() => {
    setValue("telefone", mascaraTelefone(telefoneDigitado));
  }, [telefoneDigitado]);

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
          {...register("telefone", {
            pattern: {
              value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
              message: "O telefone inserido está no formato incorreto",
            },
            required: "Campo de telefone é obrigatório",
          })}
        />
        <CampoDigitacao
          id="campo-senha"
          legenda="Crie uma senha"
          tipo="password"
          placeholder="Digite sua senha"
          error={errors.senha}
          {...register("senha", {
            required: "O campo senha é obrigatório",
            minLength: {
              value: 8,
              message: "A senha deve ter pelo menos 8 caracteres",
            },
          })}
        />
        <CampoDigitacao
          id="campo-senha-confirmacao"
          legenda="Repita a senha anterior"
          tipo="password"
          placeholder="Repita a senha"
          error={errors.senhaVerificada}
          {...register("senhaVerificada", {
            required: "Repita a senha",
            validate: (value) => validarSenha(value, senha),
          })}
        />
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
