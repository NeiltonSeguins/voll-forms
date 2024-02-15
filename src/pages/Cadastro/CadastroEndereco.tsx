import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mascaraCep } from "../../utils/mascaras";
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";

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
      <Titulo>Agora, mais alguns dados sobre você:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input
            id="campo-cep"
            placeholder="Insira seu CEP"
            type="text"
            error={errors.cep}
            {...register("cep", {
              required: "O campo de cep é obrigatório",
            })}
            onBlur={() => fetchEndereco(cepDigitado)}
          />
          {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            error={errors.rua}
            {...register("rua", { required: "Campo obrigatóirio" })}
          />
          {errors.rua && <ErrorMessage>{errors.rua.message}</ErrorMessage>}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              error={errors.numero}
              {...register("numero", { required: "Campo obrigatório" })}
            />
            {errors.numero && (
              <ErrorMessage>{errors.numero.message}</ErrorMessage>
            )}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              error={errors.bairro}
              {...register("bairro", { required: "Campo obrigatório" })}
            />
            {errors.bairro && (
              <ErrorMessage>{errors.bairro.message}</ErrorMessage>
            )}
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            error={errors.localidade}
            {...register("localidade", { required: "Campo obrigatório" })}
          />
          {errors.localidade && (
            <ErrorMessage>{errors.localidade.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEndereco;
