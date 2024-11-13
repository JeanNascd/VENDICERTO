// Páginas :
// Login: feita
// Cadastro: feito
// Recuperar senha: a fazer
// Configurações perfil: feito

let usuarios = [];

//Página Cadastrar Usuário
function validarDados(event) {
  event.preventDefault();
  let inputUsuario = document.getElementById("cadastro_usuario").value;
  let inputEmail = document.getElementById("cadastro_email").value;
  let inputSenha = document.getElementById("cadastro_senha").value;
  let inputConfirmaSenha = document.getElementById(
    "cadastro_confirmar_senha"
  ).value;

  if (!(inputConfirmaSenha == inputSenha)) {
    alert("As senhas não coincidem");
    return false;
  }

  if (localStorage.hasOwnProperty("usuariosLocalstorage")) {
    usuarios = JSON.parse(localStorage.getItem("usuariosLocalstorage"));
    for (let i = 0; i < usuarios.length; i++) {
      if (inputUsuario == usuarios[i].nome) {
        alert("Nome do usuario já existente. Digite outro nome de usuário");
        form.reset();
        return false;
      }
      if (inputEmail == usuarios[i].email) {
        alert(
          "Este e-mail já pertence a uma conta! Digite outro email ou faça login."
        );
        form.reset();
        return false;
      }
    }
  }

  cadastrarUsuario(inputUsuario, inputEmail, inputSenha);
  return true;
}

function cadastrarUsuario(usuario, email, senha) {
  let form = document.getElementById("form");

  let cadUsuario = {
    nome: usuario,
    email: email,
    senha: senha,
  };

  usuarios.push(cadUsuario);
  localStorage.setItem("usuariosLocalstorage", JSON.stringify(usuarios));

  alert("Cadastro concluído com sucesso!!!");
  window.location.href = "login.html";

  form.reset();
}

//Login

function validarLogin(event) {
  event.preventDefault();
  let inputUsuario = document.getElementById("login_usuario").value;
  let form = document.getElementById("form_login");
  if (localStorage.hasOwnProperty("usuariosLocalstorage")) {
    usuarios = JSON.parse(localStorage.getItem("usuariosLocalstorage"));
    for (let i = 0; i < usuarios.length; i++) {
      if (inputUsuario == usuarios[i].nome) {
        validarSenha(inputUsuario, usuarios[i].senha);
        return;
      }
    }
  }
  alert("Senha ou usuário inválido.");
  form.reset();
}
function validarSenha(usuario, senha) {
  let inputSenha = document.getElementById("login_senha").value;
  let form = document.getElementById("form_login");
  if (inputSenha == senha) {
    sessionStorage.setItem("usuario", usuario);
    alert("Login efetuado com sucesso!");
    window.location.href = "dashboard.html";
  } else {
    alert("Senha ou usuário inválido.");
    form.reset();
  }
}

// Trocar senha

function trocarSenha(event) {
  event.preventDefault();
  let inputSenhaAtual = document.getElementById("senhaAtual").value;
  let inputNovaSenha = document.getElementById("novaSenha").value;
  let inputConfirmarSenha = document.getElementById("confirmarSenha").value;
  let usuarioLogin = sessionStorage.getItem("usuario");
  usuarios = JSON.parse(localStorage.getItem("usuariosLocalstorage"));

  let senha = usuarios.find((usuario) => usuario.nome == usuarioLogin).senha;
  let indiceUsuario = usuarios.findIndex(
    (usuario) => usuario.nome == usuarioLogin
  );
  console.log(indiceUsuario);
  if (senha == inputSenhaAtual) {
    if (inputNovaSenha == inputConfirmarSenha) {
      usuarios[indiceUsuario].senha = inputNovaSenha;
      alert("Sua senha foi atualizada");
      localStorage.setItem("usuariosLocalstorage", JSON.stringify(usuarios));
    } else {
      alert("As senhas não coincidem");
    }
  } else {
    alert("A senha digitada não está correta");
  }
}

//Recuperar senha

// const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
// const appendAlert = (message, type) => {
//   const wrapper = document.createElement("div");
//   wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     "</div>",
//   ].join("");

//   alertPlaceholder.append(wrapper);
// };

// function ativarAlertaEmail(event) {
//   event.preventDefault();
//   appendAlert(
//     "Se o endereço de e-mail digitado estiver correto, enviamos uma e-mail com instruções sobre como redefinir sua senha. Se o e-mail não estiver na sua caixa de entrada, lembre-se de verificar sua pasta de spam.",
//     "success"
//   );
//   let form = document.getElementById("form_recSenha");
//   form.reset();
// }

function exibirModal(event) {
  event.preventDefault(); // Impede o envio do formulário

  // Verifica a validade do formulário
  const form = document.getElementById("form_recSenha");
  if (form.checkValidity()) {
    // Exibe o modal usando JavaScript puro do Bootstrap 5
    let modal = new bootstrap.Modal(document.getElementById("div_modal"));
    modal.show();
    form.reset();
  } else {
    // Se o formulário não for válido, mostra as mensagens de validação
    form.reportValidity();
  }
}
