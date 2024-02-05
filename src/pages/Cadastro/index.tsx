import Logotipo from "../../components/Logotipo";
// import Etapas from "../../components/Etapas";
import useEtapas from "../../hooks/useEtapas";
import CadastroPessoal from "./CadastroPessoal";
import CadastroEndereco from "./CadastroEndereco";
import "./styles.css";
import CadastroEspecialistaTecnico from "./CadastroEspecialistaTecnico";
import CadastroEspecialistaEndereco from "./CadastroEspecialistaEndereco";

export default function Cadastro() {
  const { etapaAtiva, handleProximaEtapa } = useEtapas();

  return (
    <>
      <Logotipo />
      {/* <Etapas
        etapaAtiva={etapaAtiva}
        completa={completa}
        handleStep={handleStep}
      /> */}

      {etapaAtiva === 0 ? (
        // <CadastroEspecialistaTecnico proximaEtapa={handleProximaEtapa} />
        <CadastroEspecialistaEndereco />
      ) : (
        // <CadastroPessoal proximaEtapa={handleProximaEtapa} />
        <CadastroEndereco proximaEtapa={handleProximaEtapa} />
      )}
    </>
  );
}
