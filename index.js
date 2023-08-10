import express from "express";

//lista de usuários
//cada item é um objeto
const usuarios = [];
let contadorUsuarios = 0;

const recados = [];
let contadorRecados = 0;

const app = express();
app.use(express.json())
const porta = 3000;

app.post('/cadastroUsuario', function (requisicao, resposta) {
 
  


   const bodyInvalido = 
   !requisicao.body.nome || !requisicao.body.senha || !requisicao.body.email;
   
   
   let existeEmail = usuarios.some(function (usuario){
      return usuario.email === requisicao.body.email;
   });

   if(bodyInvalido){
      resposta.status(400);
      resposta.send("Dados inválidos");
   }else if(existeEmail){
      resposta.status(400);
      resposta.send("Email já cadastrado")
   }else{
      const novoUsuário ={
         nome: requisicao.body.nome,
         email: requisicao.body.email,
         senha: requisicao.body.senha,
   
      };

      novoUsuário.identificador = contadorUsuarios;
      contadorUsuarios ++
      usuarios.push(novoUsuário);
      resposta.json ({
         mensagem: "Usuário criado com sucesso",
         usuario: novoUsuário,
      })
   }
  
});

app.post ("/cadastroUsuario/login", function (requisicao, resposta){
   const email = requisicao.body.email;
   const senha = requisicao.body.senha;

   const usuarioEncontrado = usuarios.find(function (usuario){
      return usuario.email === email && usuario.senha === senha;
   });
   if(usuarioEncontrado){
      resposta.json({
         mensagem: "Usuário logado com sucesso!",
         usuario: usuarioEncontrado,
      });
   }else {
      resposta.status(401);
      resposta.send("Email ou senha inválidos");
   }
});


app.post("/recados", function (requisicao, resposta){
   const recado = !requisicao.body.titulo || !requisicao.body.descricao;
   if(recado){
      resposta.status(400);
      resposta.send("Dados inválidos");
   }else{
      const novoRecado ={
         titulo: requisicao.body.titulo,
         descricao: requisicao.body.descricao,
      };

      novoRecado.identificador = contadorRecados;
      contadorRecados ++;
      recados.push(novoRecado);
      resposta.json({
         mensagem: "Recado criado com sucesso!!",
         recado: novoRecado
      });
   }
});

app.get("/recados", function (requisicao, resposta) {

   resposta.json({
      quantidade: recados.length,
      recados: recados,
   });
});

app.get("/recados/:id", function (requisicao, resposta){
   const id = parseInt(requisicao.params.id);
   const recadoEncontrado = recados.find(function (recado){
      return recado.identificador === id;
   });
   if(recadoEncontrado){
      resposta.json({
         mensagem:"Recado Encontrado",
         recado: recadoEncontrado,
      });
   }else{
      resposta.status(404);
      resposta.send("Recado não encontrado");
   }
});

app.put("/recados/:id", function(requisicao, resposta){
   const recado = !requisicao.body.titulo || !requisicao.body.descricao;
   const id = parseInt(requisicao.params.id);
   const recadoEncontrado =recados.find(function (recado){
      return recado.identificador === id;
   });
   if(recado){
      resposta.status(400);
      resposta.send("Dados Inválidos");
   }else if(!recadoEncontrado){
      resposta.status(404);
      resposta.send("Recado não encontrado");
   }else{
      recadoEncontrado.titulo = requisicao.body.titulo;
      recadoEncontrado.descricao = requisicao.body.descricao;
      resposta.json({
         mensagem: "Recado atualizado com sucesso",
         recado: recadoEncontrado,
      });
   }
});

app.delete("/recados/:id", function (requisicao, resposta){
   const id = parseInt(requisicao.params.id);
   const indice = recados.findIndex(function (recado){
      return recado.identificador === id;
   });
   if(indice === -1){
      resposta.status(404);
      resposta.send("Recado não encontrado");
   }else{
      recados.splice(indice, 1);
      resposta.json({
         mensagem: "Recado removido com sucesso",
      });
   }
});

app.listen(porta,  ( ) => {
   console.log('A aplicação está rodando na porta 3000: http://localhost:3000 ');
});



