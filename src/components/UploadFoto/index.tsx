import { forwardRef } from "react";
import uploadIcon from "/upload.svg";
import { FieldError } from "react-hook-form";
import MensagemErro from "../CampoDigitacao/MensagemErro";

interface UploadFotoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const UploadFoto = forwardRef<HTMLInputElement, UploadFotoProps>(
  ({ error, ...rest }, ref) => {
    return (
      <>
        <h3 className="titulo__upload">Sua foto</h3>
        <label htmlFor="campo-upload" className="campo__upload">
          <img src={uploadIcon} alt="ícone de upload" />
          <p className="descricao__upload">Clique para enviar</p>
          <input
            accept="image/*"
            id="campo-upload"
            type="file"
            ref={ref}
            {...rest}
          />
        </label>
        {error && <MensagemErro>{error.message}</MensagemErro>}
      </>
    );
  }
);

export default UploadFoto;
