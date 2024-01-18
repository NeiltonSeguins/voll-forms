import { SubmitHandler, useForm } from "react-hook-form";
import Botao from "../../components/Botao";
import { useEffect } from "react";
import { mascaraTelefone } from "../../utils/mascaras";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

interface IFormCadastroPessoal {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaVerificada: string;
}

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IFormCadastroPessoal>();

  const aoSubmeter: SubmitHandler<IFormCadastroPessoal> = (dados) => {
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

  const senha = watch("senha");
  const telefoneDigitado = watch("telefone");

  const validarSenha = (value: string) => {
    if (!value) {
      return "Campo obrigatório";
    }

    if (value.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres";
    }

    if (value !== senha) {
      return "As senhas não coincidem";
    }

    return true;
  };

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
        <div>
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            placeholder="Digite seu nome completo"
            aria-invalid={errors.nome ? "true" : "false"}
            {...register("nome", {
              required: "Campo de nome é obrigatório",
              minLength: {
                value: 5,
                message: "O nome deve ter pelo menos cinco caracteres",
              },
            })}
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>
        <div>
          <label htmlFor="campo-email">Email</label>
          <input
            id="campo-email"
            type="email"
            placeholder="Insira seu endereço de email"
            {...register("email", {
              required: "Campo de email obrigatório",
              validate: validarEmail,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="campo-telefone">Telefone</label>
          <input
            id="campo-telefone"
            type="text"
            placeholder="(DDD) XXXXX-XXXX"
            {...register("telefone", {
              pattern: {
                value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
                message: "O telefone inserido está no formato incorreto",
              },
              required: "Campo de telefone é obrigatório",
            })}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </div>
        <div>
          <label htmlFor="campo-senha">Crie uma senha</label>
          <input
            id="campo-senha"
            type="password"
            placeholder="Digite sua senha"
            {...register("senha", {
              required: "O campo senha é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres",
              },
            })}
          />
          {errors.senha && <span>{errors.senha.message}</span>}
        </div>
        <div>
          <label htmlFor="campo-senha-confirmacao">Repita a senha</label>
          <input
            id="campo-senha-confirmacao"
            type="password"
            placeholder="Repita a senha anterior"
            {...register("senhaVerificada", {
              required: "Repita a senha",
              validate: validarSenha,
            })}
          />
          {errors.senhaVerificada && (
            <span>{errors.senhaVerificada.message}</span>
          )}
        </div>
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
