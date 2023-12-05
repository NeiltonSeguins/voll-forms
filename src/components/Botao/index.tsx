import "./styles.css";

type BotaoProps = {
  tipo: "button" | "submit" | "reset" | undefined;
  children: string;
};

function Botao({ tipo, children }: BotaoProps) {
  return <button type={tipo}>{children}</button>;
}

export default Botao;
