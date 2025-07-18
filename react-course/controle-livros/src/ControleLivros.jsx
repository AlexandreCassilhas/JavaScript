import React, {useState, useEffect} from "react";

import './ControleLivros.css';
import MenuSuperior from "./MenuSuperior";
import FormCadastro from "./FormCadastro";

function ControleLivros() {

  return(
    <div>
      <MenuSuperior />
      <FormCadastro />
    </div>
  )
}

export default ControleLivros;