// Enable sort-keys rule to keep things easy to find
/* eslint sort-keys: "error" */

const auth = {
  loginPage: {
    inputs: {
      password: 'Senha',
      username: 'Usuário',
    },
    invalidCredentialsMessage: 'Credenciais inválidas. Tente novamente.',
    pageTitle: 'Acesse sua conta',
    registerLink: 'Registrar-se',
    submitBtn: 'Entrar',
  },
  registerPage: {
    inputs: {
      displayName: 'Como deseja ser chamado?',
      password: 'Senha',
      passwordConfirmation: 'Confirmação de senha',
      username: 'Usuário',
    },
    loginLink: 'Já possuo uma conta',
    pageTitle: 'Cadastro',
    submitBtn: 'Cadastrar-se',
  },
};

export { auth };
