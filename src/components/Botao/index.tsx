import "./styles.css";

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario";
}

function Botao({ variante = "primario", children, ...rest }: BotaoProps) {
  return (
    <button className={variante} {...rest}>
      {children}
    </button>
  );
}

export default Botao;
