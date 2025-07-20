import React, {useState, useEffect} from "react";
import './MenuSuperior.css';

function MenuSuperior({setClickMenu}) {

  

return(

    <div className="principal">
      <div className="titulo">
        <h1>Controle Pessoal de Livros</h1>
      </div>
      <div className="navbar">
        <button onClick={() => setClickMenu('insert')}>Inclusão</button>
        <button onClick={() => setClickMenu('list')}>Manutenção</button>
        <button onClick={() => setClickMenu('resumo')}>Resumo</button>
      </div>
    </div>
  )
}

export default MenuSuperior;