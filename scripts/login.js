// Páginas :
// Login: a fazer
// Cadastro: fazendo
// Recuperar senha: a fazer
// Configurações perfil: a fazer


// Cadastro de Usuário.
// validar: Campos vazios e Checkbox.
// Validar: Senha.
// Validar: Espaçamento.
// Validar: Senhas iguais.
// Validar: Tipos.
// Enviar mensagem de cadastro bem sucedido.
// Retornar o usuário para a página de login.






let usuarios = [];



let btnCadastro = document.getElementById("btnCadastro");

function cadastrarUsuario(event) {
	event.preventDefault();
	let inputUsuario = document.getElementById("cadastro_usuario").value;
	let inputEmail = document.getElementById("cadastro_email").value;
	let inputSenha = document.getElementById("cadastro_senha").value;
	let form = document.getElementById("form");
	

	if (localStorage.hasOwnProperty("usuariosLocalstorage")) {
		usuarios = JSON.parse(localStorage.getItem("usuariosLocalstorage"));
	  }
	 for (let i = 0; i < usuarios.length; i++  ) {
		if (inputUsuario == usuarios[i].nome){
			alert("Nome do usuario já existente. Digite outro nome de usuário");
			form.reset();
			break
		}
		if (inputEmail == usuarios[i].email) {
			alert("Este e-mail já pertence a uma conta! Digite outro email ou faça login.")
			form.reset();
			break
		}
	 }
	const cadUsuario = {
		nome: inputUsuario,
		email: inputEmail,
		senha: inputSenha
	}
	usuarios.push(cadUsuario)
	localStorage.setItem("usuariosLocalstorage", JSON.stringify(usuarios))

	form.reset();

}
