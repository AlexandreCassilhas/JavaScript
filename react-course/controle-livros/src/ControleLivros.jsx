import React, {useState, useEffect} from "react";
import {Routes, Route} from 'react-router-dom';

import './ControleLivros.css';
import MenuSuperior from "./MenuSuperior";
import FormCadastro from "./FormCadastro";
import ManutencaoLivros from "./ManutencaoLivros";
import ResumoLivros from "./ResumoLivros";


function ControleLivros() {

  const [clickMenu, setClickMenu] = useState('');

  return(
    <div>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<FormCadastro />} />
        <Route path="inclusao" element={<FormCadastro />} />
        <Route path="lista" element={<ManutencaoLivros />} />
        <Route path="controle" element={<ResumoLivros />} />
      </Routes>
    </div>
  )
}

/* 
  <MenuSuperior setClickMenu={setClickMenu} />
  <FormCadastro clickMenu={clickMenu} />
*/


export default ControleLivros;