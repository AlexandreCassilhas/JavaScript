import React from "react";
import iconLivros from "./assets/livros.webp";
import './PaginaInicial.css';

function PaginaInicial() {

  const imgInicial = iconLivros;
  const subtitulo = 'App simples de Controle de Livros';

  return (
    <div className="imagem-inicial">
      <h3>{subtitulo}</h3>
      <img className="imagem" src={imgInicial} alt="imagemInicial" />
    </div>
  )
}

export default PaginaInicial