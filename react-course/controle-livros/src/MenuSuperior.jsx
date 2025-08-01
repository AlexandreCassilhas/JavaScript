import React, {useState, useEffect} from "react";
import './MenuSuperior.css';
import { Link } from "react-router-dom";

import logo from './assets/logo.png'

function MenuSuperior() {

return(

    <div className="principal">
      <div className="titulo">
      <div className="logo"><img src={logo} width={100} alt="logo" /></div>
        <h1><a href="/">Controle Pessoal de Livros</a></h1>
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