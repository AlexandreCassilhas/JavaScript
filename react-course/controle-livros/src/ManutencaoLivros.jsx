import { useState, useEffect } from "react";
import { inAxios } from "../config_axios";
import ItemLista from "./ItemLista";

import "./ManutencaoLivros.css";



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
    console.log(livros);
    }, []);

  return (
    <div>
        <div className="titulo-form">
          <h4>Manutenção</h4>
        </div>
        <div>
          <form>
            <div className="form-livro">
              <div>
                <input type="text" className="campo-pesquisa" placeholder="Título ou Autor" required />
                <button type="submit">Pesquisar</button>
                <button>Todos</button>
              </div>
             
            </div>
          </form>
        </div>
        <div className="form-livro tabela-itens">
          <table>
            <thead>
              <tr>
                <th>Cód.</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Preço</th>
                <th>Foto</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map((livro) => (
                <ItemLista key={livro.id} id={livro.id} titulo={livro.titulo} autor={livro.autor} anoPublicacao={livro.anoPublicacao} preco={livro.preco} foto={livro.foto} /> 
              ))}
            </tbody>
          </table>
        </div>
    </div>
   
    
  )
};

export default ManutencaoLivros;