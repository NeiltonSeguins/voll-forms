import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mascaraCep } from "../../utils/mascaras";
import CampoDigitacao from "../../components/CampoDigitacao";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";

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
      <Form
        className="formulario__paciente"
        onSubmit={handleSubmit(aoSubmeter)}
      >
        <CampoDigitacao
          id="campo-cep"
          legenda="Cep"
          tipo="text"
          placeholder="Insira seu CEP"
          error={errors.cep}
          {...register("cep", {
            required: "O campo de cep é obrigatório",
          })}
          onBlur={() => fetchEndereco(cepDigitado)}
        />
        <CampoDigitacao
          id="campo-rua"
          legenda="Rua"
          tipo="text"
          placeholder="Rua Agarikov"
          error={errors.rua}
          {...register("rua", { required: "Campo obrigatóirio" })}
        />

        <div className="formulario__container">
          <CampoDigitacao
            id="campo-numero-rua"
            legenda="Número"
            tipo="text"
            placeholder="Ex: 20"
            error={errors.numero}
            {...register("numero", { required: "Campo obrigatório" })}
          />
          <CampoDigitacao
            id="campo-bairro"
            legenda="Bairro"
            tipo="text"
            placeholder="Vila Mariana"
            error={errors.bairro}
            {...register("bairro", { required: "Campo obrigatório" })}
          />
        </div>
        <CampoDigitacao
          id="campo-localidade"
          legenda="Localidade"
          tipo="text"
          placeholder="São Paulo, SP"
          error={errors.localidade}
          {...register("localidade", { required: "Campo obrigatório" })}
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEndereco;
