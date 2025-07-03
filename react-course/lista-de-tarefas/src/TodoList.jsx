import React, {useState, useEffect} from "react";
import './TodoList.css';
import Icone from './assets/icon.png'

function TodoList() {

  const listaStorage = localStorage.getItem('Lista');

  // inicia a lista com o conteúdo do localStorage 'Lista' se existir,
  // caso contrário, inicia com [].
  // JSON.parse => transforma a string em objeto JSON.
  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);

  const [novoItem, setNovoItem] = useState('');

  // sempre que houver alteração em 'lista', ele executa o useEffect, gravando
  // a nova versão da 'lista' no storage 'Lista'. 
  // JSON.stringify -> transforma o objeto em string, que é o formato necessário para gravar no localStorage
  useEffect(() => {
    localStorage.setItem('Lista', JSON.stringify(lista));
  }, [lista])

  function adicionaItem(form) {
    form.preventDefault();
    if(!novoItem){
      return;
    }
    // adiciona a lista já existente (...lista) + o novoItem e o status da tarefa (isCompleted: false)
    setLista([...lista, {text: novoItem, isCompleted: false}])
    setNovoItem(''); // limpa o campo
    document.getElementById('input-entrada').focus(); // seta focus

  }

  // alterna o status 'isCompleted' entre true e false a cada click
  function clicou(index){
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  // apaga da lista o item cujo o index foi captado no click do delete
  function deleta(index){
    const listaAux = [...lista];
    listaAux.splice(index, 1); // remove apenas o item correspondente ao index
    setLista(listaAux);
  }

  // zera a lista por meio do []  no setLista
  function deletaTudo(){
    setLista([]);
  }

  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}> 
        <input 
          id="input-entrada"
          type="text" 
          value={novoItem}
          onChange={(e) => {setNovoItem(e.target.value)}}
          placeholder="adicione uma tarefa"
       />
       <button className="add" type="submit">Add</button>
      </form>
      <div className="listaTarefas">
        <div style={{textAlign: 'center'}}>
          {
            lista.length < 1 ? 
              <img 
                className="icone-central"
                src={Icone}
                width={350}
                alt="todo list img"
              /> : 
            lista.map((item, index) => (
              <div 
                key={index}
                className={item.isCompleted ? "item completo" : "item"}
              > 
                <span 
                  onClick={() =>{clicou(index)}}>
                  {item.text}
                </span>
                <button
                  onClick={() =>{deleta(index)}}
                  className="del">
                  Deletar
                </button>
            </div>
            ))
          }
        </div>
        {
          // Somente se a lista tiver ao menos uma tarefa, aparece o botão de deletar todas
          lista.length > 0 &&
            <button
              onClick={() => {deletaTudo()}}
              className="deleteAll">
              Deletar Todas
            </button>
        }

      </div>
    </div>
  )
}

export default TodoList