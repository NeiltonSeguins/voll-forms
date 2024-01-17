import { SubmitHandler, useForm } from "react-hook-form";
import Botao from "../../components/Botao";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

interface IFormInput {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaVerificada: string;
}

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const aoSubmeter: SubmitHandler<IFormInput> = (dados) => {
    console.log(dados);

    proximaEtapa();
  };

  function validarEmail(valor: string) {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(valor)) {
      return "Endereço de e-mail inválido";
    }

    return true;
  }

  return (
    <>
      <h2 className="titulo">Insira alguns dados básicos:</h2>
      <form
        className="formulario__paciente"
        onSubmit={handleSubmit(aoSubmeter)}
      >
        <div>
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Digite seu nome completo"
            {...register("nome", { required: true, minLength: 7 })}
          />
        </div>
        <div>
          <label htmlFor="campo-email">Email</label>
          <input
            id="campo-email"
            type="email"
            placeholder="Insira seu endereço de email"
            {...register("email", { required: true, validate: validarEmail })}
          />
        </div>
        <div>
          <label htmlFor="campo-telefone">Telefone</label>
          <input
            id="campo-telefone"
            type="text"
            placeholder="(DDD) XXXXX-XXXX"
            {...register("telefone", {
              pattern: /^\(\d{2,3}\) \d{5}-\d{4}$/,
              required: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="campo-senha">Crie uma senha</label>
          <input
            id="campo-senha"
            type="password"
            placeholder="Digite sua senha"
            {...register("senha")}
          />
        </div>
        <div>
          <label htmlFor="campo-senha-confirmacao">Repita a senha</label>
          <input
            id="campo-senha-confirmacao"
            type="password"
            placeholder="Repita a senha anterior"
            {...register("senhaVerificada")}
          />
        </div>
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
