import React, {useState, useEffect} from "react";

import './ControleLivros.css';
import MenuSuperior from "./MenuSuperior";
import FormCadastro from "./FormCadastro";

function ControleLivros() {

  const [clickMenu, setClickMenu] = useState('');

  return(
    <div>
      <MenuSuperior setClickMenu={setClickMenu} />
      <FormCadastro clickMenu={clickMenu} />
    </div>
  )
}

export default ControleLivros;