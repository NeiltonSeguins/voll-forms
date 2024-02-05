import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";

type CadastroEspecialistaTecnicoProps = {
  proximaEtapa: () => void;
};

const CadastroEspecialistaTecnico = ({
  proximaEtapa,
}: CadastroEspecialistaTecnicoProps) => {
  return (
    <>
      <h2 className="titulo">Agora, seus dados técnicos:</h2>
      <form className="formulario__paciente">
        <CampoDigitacao
          id="campo-crm"
          legenda="CRM"
          tipo="text"
          placeholder="Insira seu número de registro"
        />
        <div className="formulario__divisor" />
        <CampoDigitacao
          id="campo-especialidade"
          legenda="Especialidade"
          tipo="text"
          placeholder="Qual sua especialidade?"
        />
        <div className="formulario__container">
          <CampoDigitacao
            id="campo-ano-conclusao"
            legenda="Ano de conclusão"
            tipo="text"
            placeholder="2005"
          />
          <CampoDigitacao
            id="campo-instituicao-ensino"
            legenda="Instituição de ensino"
            tipo="text"
            placeholder="USP"
          />
        </div>
        <div className="botao-especialidade">
          <Botao tipo="button" variante="secundario">
            Adicionar Especialidade
          </Botao>
        </div>
        <Botao tipo="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroEspecialistaTecnico;
