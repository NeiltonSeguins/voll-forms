import "./styles.css";

type BotaoProps = {
  tipo: "button" | "submit" | "reset" | undefined;
  children: string;
  handleClick?: () => void;
};

function Botao({ tipo, children, handleClick }: BotaoProps) {
  return (
    <button type={tipo} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Botao;
