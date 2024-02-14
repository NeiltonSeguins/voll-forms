import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { esquemaCadastroEspecialistaTipos } from "../../types/types";
import { esquemaCadastroEspecialista } from "../../schemas/esquemaEspecialista";

const CadastroEspecialistaTecnico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<esquemaCadastroEspecialistaTipos>({
    defaultValues: {
      crm: "",
    },
    mode: "onBlur",
    resolver: zodResolver(esquemaCadastroEspecialista),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "especialidades",
  });

  const aoSubmeter: SubmitHandler<esquemaCadastroEspecialistaTipos> = (
    dados
  ) => {
    console.log(dados);
  };

  const adicionarNovaEspecialidade = () => {
    append({ especialidade: "", anoConclusao: 0, instituicaoEnsino: "" });
  };

  return (
    <>
      <h2 className="titulo">Agora, seus dados técnicos:</h2>
      <form
        className="formulario__paciente"
        onSubmit={handleSubmit(aoSubmeter)}
      >
        <CampoDigitacao
          id="campo-crm"
          legenda="CRM"
          type="text"
          placeholder="Insira seu número de registro"
          error={errors.crm}
          {...register("crm")}
        />
        <div className="formulario__divisor" />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <CampoDigitacao
                id="campo-especialidade"
                legenda="Especialidade"
                type="text"
                placeholder="Qual sua especialidade?"
                error={errors.especialidades?.[index]?.especialidade}
                {...register(`especialidades.${index}.especialidade`)}
              />
              <div className="formulario__container">
                <CampoDigitacao
                  id="campo-ano-conclusao"
                  legenda="Ano de conclusão"
                  type="text"
                  placeholder="2005"
                  error={errors.especialidades?.[index]?.anoConclusao}
                  {...register(`especialidades.${index}.anoConclusao`)}
                />
                <CampoDigitacao
                  id="campo-instituicao-ensino"
                  legenda="Instituição de ensino"
                  type="text"
                  placeholder="USP"
                  error={errors.especialidades?.[index]?.instituicaoEnsino}
                  {...register(`especialidades.${index}.instituicaoEnsino`)}
                />
              </div>
              <div className="formulario__divisor" />
            </div>
          );
        })}
        <div className="botao-especialidade">
          <Botao
            type="button"
            variante="secundario"
            onClick={adicionarNovaEspecialidade}
          >
            Adicionar Especialidade
          </Botao>
        </div>
        <Botao type="submit">Avançar</Botao>
      </form>
    </>
  );
};

export default CadastroEspecialistaTecnico;
