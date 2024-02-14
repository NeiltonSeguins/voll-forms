import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import MensagemErro from "./MensagemErro";

interface CampoDigitacaoProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  legenda?: string;
  id: string;
  error?: FieldError | undefined;
}

const CampoDigitacao = forwardRef<HTMLInputElement, CampoDigitacaoProps>(
  ({ legenda, id, error, ...rest }, ref) => {
    return (
      <div className="campo__digitacao--container">
        <label htmlFor={id}>{legenda}</label>
        <input
          className={error ? "campo__digitacao--erro" : ""}
          id={id}
          ref={ref}
          {...rest}
        />
        {error && <MensagemErro>{error.message}</MensagemErro>}
      </div>
    );
  }
);

export default CampoDigitacao;
