import { useEffect } from "react";
import Botao from "../../components/Botao";
import { SubmitHandler, useForm } from "react-hook-form";
import { mascaraCep } from "../../utils/mascaras";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IFormCadastroEndereco>({
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

  const cepDigitado = watch("cep");

  useEffect(() => {
    setValue("cep", mascaraCep(cepDigitado));
  }, [cepDigitado]);

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
            {...register("cep", {
              required: "O campo de cep é obrigatório",
            })}
            placeholder="Insira o CEP"
          />
          {errors.cep && <span>{errors.cep.message}</span>}
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
