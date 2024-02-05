import "./styles.css";

type BotaoProps = {
  tipo: "button" | "submit" | "reset" | undefined;
  variante?: "primario" | "secundario";
  children: string;
  handleClick?: () => void;
};

function Botao({
  tipo,
  variante = "primario",
  children,
  handleClick,
}: BotaoProps) {
  return (
    <button className={variante} type={tipo} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Botao;
