import logo from "./Logo.png";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useState } from 'react';
import Botao from "../../components/Botao";
import CampoDigitacao from "../../components/CampoDigitacao";
import "./styles.css";

export default function Cadastro() {
    const [etapaAtiva, setEtapaAtiva] = useState(0);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senhaVerificada, setSenhaVerificada] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

        setEtapaAtiva(etapaAtiva + 1); // atualiza o estado da etapa para a próxima etapa
    }


    return (
        <>
            <img src={logo} alt="Logo da Voll" />

            {etapaAtiva === 0 ? (
                <>
                    <h2>Primeiro, alguns dados básicos:</h2>
                    <form onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome"
                            valor={nome}
                            placeholder="Insira seu nome"
                            onChange={setNome}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="CNPJ"
                            valor={cnpj}
                            placeholder="Insira seu cnpj"
                            onChange={setCnpj}
                        />
                        <CampoDigitacao
                            tipo="email"
                            label="Email"
                            valor={email}
                            placeholder="Insira o endereço de e-mail para login"
                            onChange={setEmail}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Senha"
                            valor={senha}
                            placeholder="Digite sua senha"
                            onChange={setSenha}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Confirme a senha"
                            valor={senhaVerificada}
                            placeholder="Confirme sua senha"
                            onChange={setSenhaVerificada}
                        />
                        <Botao tipo="submit">Avançar</Botao>
                    </form>
                </>) : (
                <>
                    <h2>Agora, mais alguns dados sobre você:</h2>
                    <form onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="tel"
                            label="Telefone"
                            valor={telefone}
                            placeholder="(DDD) XXXXX-XXXX"
                            onChange={setTelefone}
                        />
                        <CampoDigitacao
                            tipo="number"
                            label="CEP"
                            valor={cep}
                            placeholder="Insira o CEP"
                            onChange={setCep}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Rua"
                            valor={rua}
                            placeholder="Rua"
                            onChange={setRua}
                        />
                        <div>
                            <CampoDigitacao
                                tipo="number"
                                valor={numero}
                                placeholder="Número"
                                onChange={setNumero}
                            />
                            <CampoDigitacao
                                tipo="text"
                                valor={complemento}
                                placeholder="Complemento"
                                onChange={setComplemento}
                            />
                            <CampoDigitacao
                                tipo="text"
                                valor={estado}
                                placeholder="Estado"
                                onChange={setEstado}
                            />
                        </div>
                        <Botao tipo="submit">Cadastrar</Botao>
                    </form>
                </>
            )

            }
        </>
    )
}