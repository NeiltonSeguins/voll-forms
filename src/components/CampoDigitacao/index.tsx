import "./styles.css";

interface CampoDigitacaoProps {
  valor: string;
  tipo: string;
  id: string;
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
}

function CampoDigitacao({
  valor,
  tipo,
  id,
  placeholder,
  label,
  onChange,
  ...rest
}: CampoDigitacaoProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
}

export default CampoDigitacao;
