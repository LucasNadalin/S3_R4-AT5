const express = require("express");
const app = express();
const PORT = 8084;
const fs = require("fs");
const pathFile = "./livros.json"

app.use(express.json());

app.post("/cadastrarLivros", (req, res) => {
    try {
        const { titulo, autor, ano, exemplares } = req.body;

        const livro = {
            titulo: titulo,
            autor: autor,
            ano: ano,
            exemplares: exemplares
        };

        const data = fs.readFileSync(pathFile, "utf-8");
        const livros = JSON.parse(data);

        livros.push(livro);

        fs.writeFileSync(pathFile, JSON.stringify(livros, null, 4));

        res.status(201).json({ message: "Livro Cadastrado com Sucesso!" });

    } catch (error) {
        console.error("Erro ao cadastrar os livros!");
        res.status(500).json({ error: "Erro interno do servidor ao cadastrar os livros!" });
    }
});

app.get("/livrosCadastrados", (req, res) => {
    try {
        const data = fs.readFileSync(pathFile, "utf-8");

        let livros = JSON.parse(data);

        res.status(200).json(livros);
    } catch (error) {
        console.error("Erro ao exibir os livros cadastrados");
        res.status(500).json({error: "Erro interno do servidor ao exibir os livros cadastrados"});
    }
});

app.get("/consultarLivros", (req, res) => {
    try {
        const data = fs.readFileSync(pathFile, "utf-8");
        
        let livros = JSON.parse(data);

        const {tituloLivro} = req.query;

        if(tituloLivro){
            livros = livros.filter(livro => livro.titulo.toLowerCase().includes(tituloLivro.toLowerCase())); 
        };

        res.status(200).json(livros);
    } catch (error) {
        console.error("Erro ao consultar os livros!");
        res.status(500).json({error: "Erro interno do servidor ao consultar os livros!"});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});