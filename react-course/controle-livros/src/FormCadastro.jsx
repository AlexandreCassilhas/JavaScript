import React, {useState, useEffect} from "react";
import  {useForm} from "react-hook-form";

import iconLivros from "./assets/livros.webp"

import './FormCadastro.css';

const status = 'inserir';

function FormCadastro() {

  const {register, handleSubmit} = useForm();

  function salvar(dadosLivro){
    alert(JSON.stringify(dadosLivro));
  }

  if (status == 'inserir'){
      return(
        <div>
          <form onSubmit={handleSubmit(salvar)}>
            <div className="form-livro">
              <div className="campo">
                <label htmlFor="titulo">Título:</label>
                <input type="text" name="nTitulo" id="titulo" required placeholder="digite o título do livro" {...register('titulo')} />
              </div>
              <div className="campo">
                <label htmlFor="autor">
                  Autor:</label>
                <input type="text" name="nAutor" id="autor" required placeholder="digite o autor do livro" {...register('autor')} />
              </div>
              <div className="campo">
                <label htmlFor="urlFoto">
                  URL:</label>
                <input type="text" name="nUrlFoto" id="urlFoto" placeholder="digite a URL da foto do livro" {...register('urlFoto')} />
              </div>
              <div className="dois-campos">
                <div className="campo-um">
                <label htmlFor="anoPublicacao">
                  Ano de Publicação:</label>
                <input className="class-ano" type="number" name="nAnoPublicacao" id="anoPublicacao" required step={1} min={1500} {...register('anoPublicacao')} />
                </div>
                <div className="campo-dois">
                <label htmlFor="preco">
                  Preço (R$):</label>
                <input className="class-preco" type="number" name="nPreco" id="preco" required step={0.5} min={5} {...register('preco')} />
                </div>
              </div>
              <div className="botoes">
                <button className="form-buttons" type="submit">Salvar</button>
                <button className="form-buttons red-button">Limpar</button>
              </div>
            </div>
          </form>
        </div>
      )
  } else {
    return(
      <div className="imagem">
       <img 
        className="figura"
        src={iconLivros}
        alt="todo list img"
      />
      </div>
    )
  }
  
}

export default FormCadastro;