import {
  Button,
  Label,
  Fieldset,
  Input,
  ErrorMessage,
  Form,
  Titulo,
} from "../../components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { validarEmail, validarSenha } from "../../utils/validacoes";
import InputMask from "react-input-mask";

type CadastroPessoalProps = {
  proximaEtapa: () => void;
};

interface FormCadastroPessoal {
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
  } = useForm<FormCadastroPessoal>({ mode: "all" });

  const aoSubmeter: SubmitHandler<FormCadastroPessoal> = (dados) => {
    console.log(dados);

    proximaEtapa();
  };

  const senha = watch("senha");

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            error={errors.nome}
            {...register("nome", {
              required: "Campo de nome é obrigatório",
              minLength: {
                value: 5,
                message: "O nome deve ter pelo menos cinco caracteres",
              },
            })}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            error={errors.email}
            {...register("email", {
              required: "Campo de email obrigatório",
              validate: validarEmail,
            })}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>

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

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            error={errors.senha}
            {...register("senha", {
              required: "O campo senha é obrigatório",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres",
              },
            })}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Crie uma senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            error={errors.senhaVerificada}
            {...register("senhaVerificada", {
              required: "Repita a senha",
              validate: (value) => validarSenha(value, senha),
            })}
          />
          {errors.senhaVerificada && (
            <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
