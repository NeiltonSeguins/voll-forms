export const validarSenha = (value: string, senha: string) => {
  if (!value) {
    return "Campo obrigatório";
  }

  if (value.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres";
  }

  if (value !== senha) {
    return "As senhas não coincidem";
  }

  return true;
};

export const validarEmail = (valor: string) => {
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formatoEmail.test(valor)) {
    return "Endereço de e-mail inválido";
  }

  return true;
};
