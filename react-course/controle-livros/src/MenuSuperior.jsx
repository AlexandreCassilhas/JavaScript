import React, {useState, useEffect} from "react";
import './MenuSuperior.css';


function MenuSuperior() {

return(
    <div className="principal">
      <div className="titulo">
        <h1>Controle Pessoal de Livros</h1>
      </div>
      <div className="navbar">
        <button>Inclusão</button>
        <button>Manutenção</button>
        <button>Resumo</button>

      </div>
    </div>
  )
}

export default MenuSuperior;