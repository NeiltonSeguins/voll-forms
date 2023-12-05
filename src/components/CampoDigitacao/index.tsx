import "./styles.css";

interface Props {
  valor: string;
  tipo: string;
  placeholder: string;
  onChange: (value: string) => void;
  label?: string;
}

function CampoDigitacao({ valor, tipo, placeholder, onChange, label }: Props) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default CampoDigitacao;
