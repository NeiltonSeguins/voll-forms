import { z } from "zod";
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { mascaraCep } from "../../utils/mascaras";
import UploadFoto from "../../components/UploadFoto";
import { supabase } from "../../libs/supabase";

const esquemaEspecialistaEndereco = z
  .object({
    endereco: z.object({
      avatar: z.instanceof(FileList).transform((lista) => lista.item(0)!),
      cep: z.string().min(1, "Informe um CEP válido"),
      rua: z.string().min(1, "Informe uma Rua válida"),
      numero: z.coerce.number().min(1, "Informe um número"),
      bairro: z.string().min(1, "Informe um Bairro válido"),
      localidade: z.string().min(1, "Informe uma Localidade válida"),
    }),
  })
  .transform((field) => ({
    endereco: {
      avatar: field.endereco.avatar,
      cep: field.endereco.cep,
      rua: field.endereco.rua,
      numero: field.endereco.numero,
      bairro: field.endereco.bairro,
      localidade: field.endereco.localidade,
    },
  }));

type esquemaEspecialistaEnderecoTipos = z.infer<
  typeof esquemaEspecialistaEndereco
>;

type EnderecoProps = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

const CadastroEspecialistaEndereco = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(esquemaEspecialistaEndereco),
    defaultValues: {
      endereco: {
        avatar: new File([""], "dummy.jpg", { type: "image/jpeg" }),
        cep: "",
        rua: "",
        numero: 0,
        bairro: "",
        localidade: "",
      },
    },
  });

  const codigoCep = watch("endereco.cep");

  const handleSetData = useCallback(
    (data: EnderecoProps) => {
      setValue("endereco.bairro", data.bairro);
      setValue("endereco.rua", data.logradouro);
      setValue("endereco.localidade", data.localidade + ", " + data.uf);
    },
    [setValue]
  );

  const handleFetchEndereco = useCallback(async (cep: string) => {
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const data = await result.json();
    handleSetData(data);
  }, []);

  useEffect(() => {
    setValue("endereco.cep", mascaraCep(codigoCep));
    if (codigoCep.length !== 9) return;
    handleFetchEndereco(codigoCep);

    if (isSubmitSuccessful) {
      reset();
    }
  }, [handleFetchEndereco, codigoCep, setValue]);

  const aoSubmeter = async (dados: esquemaEspecialistaEnderecoTipos) => {
    await supabase.storage
      .from("react-forms")
      .upload(dados.endereco.avatar.name, dados.endereco.avatar);

    console.log(dados);
  };

  return (
    <>
      <h2 className="titulo">Para finalizar, só alguns detalhes!</h2>
      <form
        onSubmit={handleSubmit(aoSubmeter)}
        className="formulario__paciente"
      >
        <UploadFoto
          error={errors.endereco?.avatar}
          {...register("endereco.avatar")}
        />

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
