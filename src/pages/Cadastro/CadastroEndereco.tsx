import Botao from "../../components/Botao";
import { SubmitHandler, useForm } from "react-hook-form";

type CadastroEnderecoProps = {
  proximaEtapa: () => void;
};

interface IFormCadastroEndereco {
  estado: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
}

const CadastroEndereco = ({ proximaEtapa }: CadastroEnderecoProps) => {
  const { register, handleSubmit } = useForm<IFormCadastroEndereco>({
    defaultValues: {
      estado: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
    },
  });

  const aoSubmeter: SubmitHandler<IFormCadastroEndereco> = (dados) => {
    console.log(dados);
    proximaEtapa();
  };

  return (
    <>
      <h2 className="titulo">Agora, mais alguns dados sobre você:</h2>
      <form
        className="formulario__paciente"
        onSubmit={handleSubmit(aoSubmeter)}
      >
        <div>
          <label htmlFor="campo-cep">Cep</label>
          <input
            id="campo-cep"
            type="text"
            {...register("cep")}
            placeholder="Insira o CEP"
          />
        </div>
        <div>
          <label htmlFor="campo-rua">Rua</label>
          <input
            id="campo-rua"
            type="text"
            {...register("rua")}
            placeholder="Rua"
          />
        </div>
        <div className="formulario__container">
          <div>
            <label htmlFor="campo-numero-rua">Número</label>
            <input
              id="campo-numero-rua"
              type="text"
              {...register("numero")}
              placeholder="Número"
            />
          </div>
          <div>
            <label htmlFor="campo-complemento">Complemento</label>
            <input
              id="campo-complemento"
              type="text"
              {...register("complemento")}
              placeholder="Complemento"
            />
          </div>
        </div>
        <div>
          <label htmlFor="campo-estado">Estado</label>
          <input
            id="campo-estado"
            type="text"
            {...register("estado")}
            placeholder="Estado"
          />
        </div>
        <Botao tipo="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEndereco;
