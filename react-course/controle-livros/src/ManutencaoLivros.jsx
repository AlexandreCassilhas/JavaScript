import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import ItemLista from "./ItemLista";



const ManutencaoLivros = () => {

  const [livros, setLivros] = useState([]);

  async function obterLista() {
    try{
      const lista = await inAxios.get('livros');
      setLivros(lista.data);
    } catch(error) {
      alert(`Erro... Não foi possível obter os dados. ${error}`);
    }
  };

  // define o método a ser executado quando o componente for renderizado
  useEffect(() => {
    obterLista();
  }, []);

  return (
    <div>
      <div className="mod-titulo">
        <h4>Manutenção</h4>
      </div>
      <div>
        <form>
          <input type="text" placeholder="Título ou Autor" required />
        </form>
      </div>
    </div>
    
  )
}

export default ManutencaoLivros;