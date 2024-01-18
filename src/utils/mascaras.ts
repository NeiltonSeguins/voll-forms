export const mascaraCep = (cep: string | undefined) => {
  if (!cep) return "";

  return cep
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};

export const mascaraTelefone = (telefone: string | undefined) => {
  if (!telefone) return "";

  return telefone
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};
