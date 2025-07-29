import React, {useState, useEffect} from "react";
import './MenuSuperior.css';
import { Link } from "react-router-dom";

function MenuSuperior() {

  

return(

    <div className="principal">
      <div className="titulo">
        <h1>Controle Pessoal de Livros</h1>
      </div>
      <div className="navbar">
        <ul>
          <li><Link to="/inclusao">Inclusão</Link></li>
          <li><Link to="/lista">Manutenção</Link></li>
          <li><Link to="/controle">Controle</Link></li>
        </ul>
      </div>
    </div>
  )
}

/* 
        <button onClick={() => setClickMenu('insert')}>Inclusão</button>
        <button onClick={() => setClickMenu('list')}>Manutenção</button>
        <button onClick={() => setClickMenu('resumo')}>Resumo</button>
*/


export default MenuSuperior;