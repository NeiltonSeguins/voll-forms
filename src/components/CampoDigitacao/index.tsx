import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { Fieldset } from "../Fieldset";
import { Label } from "../Label";
import { ErrorMessage } from "../ErrorMessage";

interface CampoDigitacaoProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  legenda?: string;
  id: string;
  tipo: string;
  placeholder: string;
  error?: FieldError | undefined;
}

const CampoDigitacao = forwardRef<HTMLInputElement, CampoDigitacaoProps>(
  ({ legenda, id, tipo = "text", placeholder, error, ...rest }, ref) => {
    return (
      <Fieldset>
        <Label htmlFor={id}>{legenda}</Label>
        <input
          className={error ? "campo__digitacao--erro" : ""}
          id={id}
          type={tipo}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Fieldset>
    );
  }
);

export default CampoDigitacao;
