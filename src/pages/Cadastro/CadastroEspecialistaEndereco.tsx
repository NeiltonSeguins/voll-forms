import { z } from "zod";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import upload from "/upload.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const esquemaEspecialistaEndereco = z.object({
  endereco: z.object({
    cep: z.string().min(9, "Informe um CEP válido"),
    rua: z.string().min(1, "Informe uma Rua válida"),
    numero: z.coerce.number().min(1, "Informe um número"),
    bairro: z.string().min(1, "Informe um Bairro válido"),
    localidade: z.string().min(1, "Informe uma Localidade válida"),
  }),
});

type esquemaEspecialistaEnderecoTipos = z.infer<
  typeof esquemaEspecialistaEndereco
>;

const CadastroEspecialistaEndereco = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(esquemaEspecialistaEndereco),
    defaultValues: {
      endereco: {
        cep: "",
        rua: "",
        numero: 0,
        bairro: "",
        localidade: "",
      },
    },
  });

  const aoSubmeter = (dados: esquemaEspecialistaEnderecoTipos) => {
    console.log(dados);
  };

  return (
    <>
      <h2 className="titulo">Para finalizar, só alguns detalhes!</h2>
      <form
        onSubmit={handleSubmit(aoSubmeter)}
        className="formulario__paciente"
      >
        <h3 className="titulo__upload">Sua foto</h3>
        <label htmlFor="campo-upload" className="campo__upload">
          <img src={upload} alt="ícone de upload" />
          <p className="descricao__upload">Clique para enviar</p>
          <input id="campo-upload" type="file" />
        </label>

        <div className="formulario__divisor" />
        <CampoDigitacao
          id="campo-cep"
          legenda="Cep"
          tipo="text"
          placeholder="Insira seu CEP"
          error={errors.endereco?.cep}
          {...register("endereco.cep")}
        />
        <CampoDigitacao
          id="campo-rua"
          legenda="Rua"
          tipo="text"
          placeholder="Rua Agarikov"
          error={errors.endereco?.rua}
          {...register("endereco.rua")}
        />

        <div className="formulario__container">
          <CampoDigitacao
            id="campo-numero-rua"
            legenda="Número"
            tipo="text"
            placeholder="Ex: 20"
            error={errors.endereco?.numero}
            {...register("endereco.numero")}
          />
          <CampoDigitacao
            id="campo-bairro"
            legenda="Bairro"
            tipo="text"
            placeholder="Vila Mariana"
            error={errors.endereco?.bairro}
            {...register("endereco.bairro")}
          />
        </div>
        <CampoDigitacao
          id="campo-localidade"
          legenda="Localidade"
          tipo="text"
          placeholder="São Paulo, SP"
          error={errors.endereco?.localidade}
          {...register("endereco.localidade")}
        />
        <Botao tipo="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
