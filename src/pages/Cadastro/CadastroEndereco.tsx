import { useEffect } from "react";
import Botao from "../../components/Botao";
import { SubmitHandler, useForm } from "react-hook-form";
import { mascaraCep } from "../../utils/mascaras";

type CadastroEnderecoProps = {
  proximaEtapa: () => void;
};

interface IFormCadastroEndereco {
  localidade: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
}

const CadastroEndereco = ({ proximaEtapa }: CadastroEnderecoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<IFormCadastroEndereco>({
    defaultValues: {
      localidade: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
    },
  });

  const aoSubmeter: SubmitHandler<IFormCadastroEndereco> = (dados) => {
    console.log(dados);
    reset();
    proximaEtapa();
  };

  const cepDigitado = watch("cep");

  const fetchEndereco = async (cep: string) => {
    if (!cep) {
      setError("cep", {
        type: "manual",
        message: "Cep inválido",
      });

      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok) {
        setValue("rua", data.logradouro);
        setValue("localidade", `${data.localidade}, ${data.uf}`);
        setValue("bairro", data.bairro);
      } else {
        throw new Error("Cep inválido");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            onBlur={() => fetchEndereco(cepDigitado)}
          />
          {errors.cep && <span>{errors.cep.message}</span>}
        </div>
        <div>
          <label htmlFor="campo-rua">Rua</label>
          <input
            id="campo-rua"
            type="text"
            {...register("rua", { required: "Campo obrigatóirio" })}
            placeholder="Rua"
          />
        </div>
        <div className="formulario__container">
          <div>
            <label htmlFor="campo-numero-rua">Número</label>
            <input
              id="campo-numero-rua"
              type="text"
              {...register("numero", { required: "Obrigatório" })}
              placeholder="Número"
            />
            {errors.numero && <span>{errors.numero.message}</span>}
          </div>
          <div>
            <label htmlFor="campo-bairro">Bairro</label>
            <input
              id="campo-bairro"
              type="text"
              {...register("bairro")}
              placeholder="bairro"
            />
          </div>
        </div>
        <div>
          <label htmlFor="campo-localidade">Localidade</label>
          <input
            id="campo-localidade"
            type="text"
            {...register("localidade")}
            placeholder="Estado"
          />
        </div>
        <Botao tipo="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEndereco;
