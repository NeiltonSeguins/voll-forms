import { SubmitHandler, useForm } from "react-hook-form";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaCadastroTipos } from "../../types/types";
import { esquemaPacienteCadastro } from "../../schemas/esquemaPaciente";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<esquemaCadastroTipos>({
    mode: "all",
    resolver: zodResolver(esquemaPacienteCadastro),
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
