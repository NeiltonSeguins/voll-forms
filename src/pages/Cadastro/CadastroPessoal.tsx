import CampoDigitacao from "../../components/CampoDigitacao";
import Botao from "../../components/Botao";
import { useState } from "react";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [senhaVerificada, setSenhaVerificada] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <>
      <h2 className="titulo">Insira alguns dados básicos:</h2>
      <form className="formulario__paciente" onSubmit={proximaEtapa}>
        <CampoDigitacao
          id="campo-nome"
          tipo="text"
          label="Nome"
          valor={nome}
          placeholder="Digite seu nome completo"
          onChange={setNome}
        />
        <CampoDigitacao
          id="campo-email"
          tipo="email"
          label="Email"
          valor={email}
          placeholder="Insira seu endereço de email"
          onChange={setEmail}
        />
        <CampoDigitacao
          id="campo-telefone"
          tipo="tel"
          label="Telefone"
          valor={telefone}
          placeholder="(DDD) XXXXX-XXXX"
          onChange={setTelefone}
        />
        <CampoDigitacao
          id="campo-senha"
          tipo="password"
          label="Crie uma senha"
          valor={senha}
          placeholder="Digite sua senha"
          onChange={setSenha}
        />
        <CampoDigitacao
          id="campo-senha-confirmacao"
          tipo="password"
          label="Repita a senha"
          valor={senhaVerificada}
          placeholder="Repita a senha anterior"
          onChange={setSenhaVerificada}
        />
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroPessoal;
