import useEtapas from "../../hooks/useEtapas";
import CadastroPessoal from "./CadastroPessoal";
import CadastroEndereco from "./CadastroEndereco";
import { Logotipo } from "../../components";
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

      {/* {etapaAtiva === 0 ? (
      ) : ( */}
      <CadastroPessoal proximaEtapa={handleProximaEtapa} />
      {/* <CadastroEndereco proximaEtapa={handleProximaEtapa} /> */}
      {/* // )} */}
    </>
  );
}
