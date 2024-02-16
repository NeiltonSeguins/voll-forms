import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { esquemaCadastroEspecialistaTipos } from "../../types/types";
import { esquemaCadastroEspecialista } from "../../schemas/esquemaEspecialista";
import {
  Button,
  ButtonContainer,
  Divisor,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";

const CadastroEspecialistaTecnico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
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
    reset();
  };

  const adicionarNovaEspecialidade = () => {
    append({ especialidade: "", anoConclusao: 0, instituicaoEnsino: "" });
  };

  return (
    <>
      <Titulo className="titulo">Agora, seus dados técnicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label>CRM</Label>
          <Input
            id="campo-crm"
            type="text"
            placeholder="Insira seu número de registro"
            {...register("crm")}
          />
          {errors.crm && <ErrorMessage>{errors.crm.message}</ErrorMessage>}
        </Fieldset>
        <Divisor />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <Fieldset>
                <Label>Especialidade</Label>
                <Input
                  id="campo-especialidade"
                  type="text"
                  placeholder="Qual sua especialidade?"
                  {...register(`especialidades.${index}.especialidade`)}
                />
                {errors.especialidades?.[index]?.especialidade && (
                  <ErrorMessage>
                    {errors.especialidades?.[index]?.especialidade?.message}
                  </ErrorMessage>
                )}
              </Fieldset>

              <FormContainer>
                <Fieldset>
                  <Label>Ano de conclusão</Label>
                  <Input
                    id="campo-ano-conclusao"
                    type="text"
                    placeholder="2005"
                    {...register(`especialidades.${index}.anoConclusao`)}
                  />
                  {errors.especialidades?.[index]?.anoConclusao && (
                    <ErrorMessage>
                      {errors.especialidades?.[index]?.anoConclusao?.message}
                    </ErrorMessage>
                  )}
                </Fieldset>
                <Fieldset>
                  <Label>Instituição de ensino</Label>
                  <Input
                    id="campo-instituicao-ensino"
                    type="text"
                    placeholder="USP"
                    {...register(`especialidades.${index}.instituicaoEnsino`)}
                  />
                  {errors.especialidades?.[index]?.instituicaoEnsino && (
                    <ErrorMessage>
                      {
                        errors.especialidades?.[index]?.instituicaoEnsino
                          ?.message
                      }
                    </ErrorMessage>
                  )}
                </Fieldset>
              </FormContainer>
              <Divisor />
            </div>
          );
        })}
        <ButtonContainer>
          <Button
            type="button"
            $variante="secundario"
            onClick={adicionarNovaEspecialidade}
          >
            Adicionar Especialidade
          </Button>
        </ButtonContainer>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaTecnico;
