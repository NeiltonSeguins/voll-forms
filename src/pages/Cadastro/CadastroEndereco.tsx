import { useState } from "react";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";

type CadastroEnderecoProps = {
  proximaEtapa: () => void;
};

const CadastroEndereco = ({ proximaEtapa }: CadastroEnderecoProps) => {
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  return (
    <>
      <h2 className="titulo">Agora, mais alguns dados sobre você:</h2>
      <form className="formulario__paciente" onSubmit={proximaEtapa}>
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
  );
};

export default CadastroEndereco;
