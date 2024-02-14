import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import UploadFoto from "../../components/UploadFoto";
import useCep from "../../hooks/useCep";

const CadastroEspecialistaEndereco = () => {
  const { handleSubmit, aoSubmeter, register, errors } = useCep();

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
          type="text"
          placeholder="Insira seu CEP"
          error={errors.endereco?.cep}
          {...register("endereco.cep")}
        />
        <CampoDigitacao
          id="campo-rua"
          legenda="Rua"
          type="text"
          placeholder="Rua Agarikov"
          error={errors.endereco?.rua}
          {...register("endereco.rua")}
        />

        <div className="formulario__container">
          <CampoDigitacao
            id="campo-numero-rua"
            legenda="Número"
            type="text"
            placeholder="Ex: 20"
            error={errors.endereco?.numero}
            {...register("endereco.numero")}
          />
          <CampoDigitacao
            id="campo-bairro"
            legenda="Bairro"
            type="text"
            placeholder="Vila Mariana"
            error={errors.endereco?.bairro}
            {...register("endereco.bairro")}
          />
        </div>
        <CampoDigitacao
          id="campo-localidade"
          legenda="Localidade"
          type="text"
          placeholder="São Paulo, SP"
          error={errors.endereco?.localidade}
          {...register("endereco.localidade")}
        />
        <Botao type="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
