import React, {useState, useEffect} from "react";

import './ControleLivros.css';
import MenuSuperior from "./MenuSuperior";
import FormCadastro from "./FormCadastro";

function ControleLivros() {

  const [clickInsert, setClickInsert] = useState(false);
  const [clickLista, setClickLista] = useState(false);

  return(
    <div>
      <MenuSuperior setClickInsert={setClickInsert} setClickLista={setClickLista} />
      <FormCadastro clickInsert={clickInsert} clickLista={clickLista} />
    </div>
  )
}

export default ControleLivros;