require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 2000;




app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const listaAnime = [
  {
    id: 1,
    nome: "Attack on titan",
    sinopse:
      "Para escapar dos titãs, gigantes devoradores de homens, a humanidade se refugiou em cidades cercadas por enormes muralhas. Quando eles voltam a atacar, Eren Yeager se junta à luta para combater as criaturas.",
    genero: "Ação, Terror, Aventura",
    imagem: "https://studiosol-a.akamaihd.net/letras/250x250/fotos/0/9/6/4/0964b155d5755b97b4d78b438bc3d9a8.jpg",
    curiosidade:"Hajime Isayama teve a ideia de Attack On Titan quando viu um bêbado em um café. A falta de capacidade dele de se comunicar com a pessoa da mesma espécie foi uma de suas principais inspirações. Ele cresceu em uma zona rural e queria explorar além de sua vila, daí o conceito da humanidade em um muralha.",
  },
  {
    id: 2,
    nome: "Naruto Series",
    sinopse:
      "Naruto é um jovem órfão habitante da Vila da Folha que sonha se tornar o quinto Hokage, o maior guerreiro e governante da vila. Ao se graduar como ninja, descobre que tem um demônio raposa selado dentro de si..",
      genero: "Ação e aventura",
    imagem: "https://i.pinimg.com/originals/a9/ff/1b/a9ff1b61f11110a25e2fb061b7ec1f79.png",
    
  },
  {
    id: 3,
    nome: "One Piece",
    sinopse:
      "One Piece segue a história de um grupo de piratas liderado por Monkey D. Luffy. O garoto, que possui um corpo elástico, pretende se tornar o Rei dos Piratas e para isso deve encontrar o One pPiece, tesouro misterioso capaz de torná-lo imbatível, segundo as lendas.",
    genero: "Ação e aventura",
    imagem: "https://i0.wp.com/pngimage.net/wp-content/uploads/2018/06/icon-one-piece-png-6.png",
    
  },
  {
    id: 4,
    nome: "Dragon Ball Series",
    sinopse:
      "A série segue as aventuras do protagonista, Son Goku, desde sua infância até a idade adulta enquanto ele treina artes marciais e explora o mundo em busca de sete esferas conhecidas como as Esferas do Dragão, que convocam um dragão que concede um desejo quando reunidas.",
    genero: "Ação, aventura, super poder",
    imagem: "https://baixaraplicativo.com/wp-content/uploads/2020/09/DRAGON-BALL-Z-DOKKAN-BATTLE-250x250.png",
    
  },
];

let anime = undefined;

// Rotas
app.get("/", (req, res) => {
  res.render("index", { listaAnime, anime });
});

app.get("/details/:id", (req, res)=> {
const id = req.params.id-1
res.render("details", {listaAnime, id} )

});

app.post("/create", (req, res) => {
  const anime = req.body;
  anime.id = listaAnime.length + 1;
  listaAnime.push(anime);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  anime = listaAnime.find((anime) => anime.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newAnime = req.body;
  newAnime.id = id + 1;
  listaAnime[id] = newAnime;
  anime = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete listaAnime[id];

  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em: http://localhost:${port}`),
);
  
