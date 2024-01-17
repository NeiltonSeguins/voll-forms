import Botao from "../../components/Botao";
import { ChangeEvent, FormEvent, useState } from "react";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const [entrada, setEntrada] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    senhaVerificada: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const entradasAtualizadas = { ...entrada, [name]: value };
    setEntrada(entradasAtualizadas);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(entrada);

    setEntrada({
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      senhaVerificada: "",
    });

    proximaEtapa();
  }

  return (
    <>
      <h2 className="titulo">Insira alguns dados básicos:</h2>
      <form className="formulario__paciente" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="campo-nome">Nome</label>
          <input
            id="campo-nome"
            type="text"
            name="nome"
            value={entrada.nome}
            placeholder="Digite seu nome completo"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="campo-email">Email</label>
          <input
            id="campo-email"
            type="email"
            name="email"
            value={entrada.email}
            placeholder="Insira seu endereço de email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="campo-telefone">Telefone</label>
          <input
            id="campo-telefone"
            type="text"
            name="telefone"
            value={entrada.telefone}
            placeholder="(DDD) XXXXX-XXXX"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="campo-senha">Crie uma senha</label>
          <input
            id="campo-senha"
            type="password"
            name="senha"
            value={entrada.senha}
            placeholder="Digite sua senha"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="campo-senha-confirmacao">Repita a senha</label>
          <input
            id="campo-senha-confirmacao"
            type="password"
            name="senhaVerificada"
            value={entrada.senhaVerificada}
            placeholder="Repita a senha anterior"
            onChange={handleChange}
          />
        </div>
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
