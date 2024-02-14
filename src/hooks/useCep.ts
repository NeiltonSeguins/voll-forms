import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { esquemaEspecialistaEndereco } from "../schemas/esquemaEspecialista";
import { useCallback, useEffect } from "react";
import {
  EnderecoProps,
  esquemaEspecialistaEnderecoTipos,
} from "../types/types";
import { mascaraCep } from "../utils/mascaras";
import { supabase } from "../libs/supabase";

const useCep = () => {
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

  return {
    errors,
    register,
    handleSubmit,
    aoSubmeter,
  };
};

export default useCep;
