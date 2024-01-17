import { ChangeEvent, FormEvent, useState } from "react";
import Botao from "../../components/Botao";

type CadastroEnderecoProps = {
  proximaEtapa: () => void;
};

const CadastroEndereco = ({ proximaEtapa }: CadastroEnderecoProps) => {
  const [entrada, setEntrada] = useState({
    estado: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const entradasAtualizadas = { ...entrada, [name]: value };
    setEntrada(entradasAtualizadas);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(entrada);

    setEntrada({
      estado: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
    });

    proximaEtapa();
  }

  return (
    <>
      <h2 className="titulo">Agora, mais alguns dados sobre você:</h2>
      <form className="formulario__paciente" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="campo-cep">Cep</label>
          <input
            id="campo-cep"
            type="text"
            name="cep"
            value={entrada.cep}
            placeholder="Insira o CEP"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="campo-rua">Rua</label>
          <input
            id="campo-rua"
            type="text"
            name="rua"
            value={entrada.rua}
            placeholder="Rua"
            onChange={handleChange}
          />
        </div>
        <div className="formulario__container">
          <div>
            <label htmlFor="campo-numero-rua">Número</label>
            <input
              id="campo-numero-rua"
              type="text"
              name="numero"
              value={entrada.numero}
              placeholder="Número"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="campo-complemento">Complemento</label>
            <input
              id="campo-complemento"
              type="text"
              name="complemento"
              value={entrada.complemento}
              placeholder="Complemento"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="campo-estado">Estado</label>
          <input
            id="campo-estado"
            type="text"
            name="estado"
            value={entrada.estado}
            placeholder="Estado"
            onChange={handleChange}
          />
        </div>
        <Botao tipo="submit">Cadastrar</Botao>
      </form>
    </>
  );
};

export default CadastroEndereco;
