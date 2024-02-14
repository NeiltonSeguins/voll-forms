import { z } from "zod";
import { esquemaPacienteCadastro } from "../schemas/esquemaPaciente";
import {
  esquemaCadastroEspecialista,
  esquemaEspecialistaEndereco,
} from "../schemas/esquemaEspecialista";

export type esquemaCadastroTipos = z.infer<typeof esquemaPacienteCadastro>;

export type esquemaCadastroEspecialistaTipos = z.infer<
  typeof esquemaCadastroEspecialista
>;

export type esquemaEspecialistaEnderecoTipos = z.infer<
  typeof esquemaEspecialistaEndereco
>;

export type EnderecoProps = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};
