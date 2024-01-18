import React from "react";

type MensagemErroProps = {
  children: React.ReactNode;
};

const MensagemErro = ({ children }: MensagemErroProps) => {
  return <span className="mensagem-erro">{children}</span>;
};

export default MensagemErro;
