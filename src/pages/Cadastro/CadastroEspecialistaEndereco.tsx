import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import upload from "/upload.svg";

const CadastroEspecialistaEndereco = () => {
  return (
    <>
      <h2 className="titulo">Para finalizar, só alguns detalhes!</h2>
      <form className="formulario__paciente">
        <h3 className="titulo__upload">Sua foto</h3>
        <label htmlFor="campo-upload" className="campo__upload">
          <img src={upload} alt="ícone de upload" />
          <p className="descricao__upload">Clique para enviar</p>
          <input id="campo-upload" type="file" />
        </label>

        <div className="formulario__divisor" />
        <CampoDigitacao
          id="campo-cep"
          legenda="Cep"
          tipo="text"
          placeholder="Insira seu CEP"
        />
        <CampoDigitacao
          id="campo-rua"
          legenda="Rua"
          tipo="text"
          placeholder="Rua Agarikov"
        />

        <div className="formulario__container">
          <CampoDigitacao
            id="campo-numero-rua"
            legenda="Número"
            tipo="text"
            placeholder="Ex: 20"
          />
          <CampoDigitacao
            id="campo-bairro"
            legenda="Bairro"
            tipo="text"
            placeholder="Vila Mariana"
          />
        </div>
        <CampoDigitacao
          id="campo-localidade"
          legenda="Localidade"
          tipo="text"
          placeholder="São Paulo, SP"
        />
        <Botao tipo="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
