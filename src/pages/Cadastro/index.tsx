import logo from "./Logo.png";
import { useState } from "react";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import "./styles.css";

export default function Cadastro() {
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [senhaVerificada, setSenhaVerificada] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o envio padrão do formulário

    setEtapaAtiva(etapaAtiva + 1); // atualiza o estado da etapa para a próxima etapa
  };

  return (
    <>
      <img className="logo__formulario" src={logo} alt="Logo da Voll" />

      {etapaAtiva === 0 ? (
        <>
          <h2 className="titulo">Insira alguns dados básicos:</h2>
          <form className="formulario__paciente" onSubmit={handleSubmit}>
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
      ) : (
        <>
          <h2 className="titulo">Agora, mais alguns dados sobre você:</h2>
          <form className="formulario__paciente" onSubmit={handleSubmit}>
            <CampoDigitacao
              id="campo-cep"
              tipo="text"
              label="CEP"
              valor={cep}
              placeholder="Insira o CEP"
              onChange={setCep}
            />
            <CampoDigitacao
              id="campo-rua"
              tipo="text"
              label="Rua"
              valor={rua}
              placeholder="Rua"
              onChange={setRua}
            />
            <div className="formulario__container">
              <CampoDigitacao
                id="campo-numero-rua"
                label="Número"
                tipo="number"
                valor={numero}
                placeholder="Número"
                onChange={setNumero}
              />
              <CampoDigitacao
                id="campo-complemento"
                label="Complemento"
                tipo="text"
                valor={complemento}
                placeholder="Complemento"
                onChange={setComplemento}
              />
            </div>
            <CampoDigitacao
              id="campo-estado"
              label="Estado"
              tipo="text"
              valor={estado}
              placeholder="Estado"
              onChange={setEstado}
            />
            <Botao tipo="submit">Cadastrar</Botao>
          </form>
        </>
      )}
    </>
  );
}
