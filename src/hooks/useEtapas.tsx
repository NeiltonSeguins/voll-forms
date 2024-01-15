import { useState } from "react";

const useEtapas = () => {
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const [completa, setCompleta] = useState<{
    [k: number]: boolean;
  }>({});

  const handleProximaEtapa = () => {
    setEtapaAtiva((etapaAtivaAnterior) => etapaAtivaAnterior + 1);
    const novaEtapaCompleta = completa;
    novaEtapaCompleta[etapaAtiva] = true;
    setCompleta(novaEtapaCompleta);
  };

  const handleStep = (step: number) => () => {
    setEtapaAtiva(step);
  };

  return {
    etapaAtiva,
    completa,
    handleStep,
    handleProximaEtapa,
  };
};

export default useEtapas;
