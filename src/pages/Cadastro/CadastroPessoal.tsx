import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { validarEmail, validarSenha } from "../../utils/validacoes";
import CampoDigitacao from "../../components/CampoDigitacao";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import { Fieldset } from "../../components/Fieldset";
import { ErrorMessage } from "../../components/ErrorMessage";
import InputMask from "react-input-mask";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

interface IFormCadastroPessoal {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  senhaVerificada: string;
}

const CadastroPessoal = ({ proximaEtapa }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<IFormCadastroPessoal>();

  const aoSubmeter: SubmitHandler<IFormCadastroPessoal> = (dados) => {
    console.log(dados);

    proximaEtapa();
  };

  const senha = watch("senha");

  return (
    <>
      <h2 className="titulo">Insira alguns dados básicos:</h2>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <CampoDigitacao
          id="campo-nome"
          legenda="Nome"
          tipo="text"
          placeholder="Digite seu nome completo"
          error={errors.nome}
          {...register("nome", {
            required: "Campo de nome é obrigatório",
            minLength: {
              value: 5,
              message: "O nome deve ter pelo menos cinco caracteres",
            },
          })}
        />
        <CampoDigitacao
          id="campo-email"
          legenda="Email"
          tipo="email"
          placeholder="Insira seu endereço de email"
          error={errors.email}
          {...register("email", {
            required: "Campo de email obrigatório",
            validate: validarEmail,
          })}
        />
        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange } }) => (
            <Fieldset>
              <Label>Telefone</Label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Ex: (DDD) XXXXX-XXXX"
                onChange={onChange}
              />
              {errors.telefone && (
                <ErrorMessage>{errors.telefone.message}</ErrorMessage>
              )}
            </Fieldset>
          )}
        />
        <CampoDigitacao
          id="campo-senha"
          legenda="Crie uma senha"
          tipo="password"
          placeholder="Digite sua senha"
          error={errors.senha}
          {...register("senha", {
            required: "O campo senha é obrigatório",
            minLength: {
              value: 8,
              message: "A senha deve ter pelo menos 8 caracteres",
            },
          })}
        />
        <CampoDigitacao
          id="campo-senha-confirmacao"
          legenda="Repita a senha anterior"
          tipo="password"
          placeholder="Repita a senha"
          error={errors.senhaVerificada}
          {...register("senhaVerificada", {
            required: "Repita a senha",
            validate: (value) => validarSenha(value, senha),
          })}
        />
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
