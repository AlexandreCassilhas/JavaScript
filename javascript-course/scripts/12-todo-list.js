const todoList = [{
    name: 'wash the dishes',
    dueDate: '12/10/2022'
  }, {
    name: 'make dinner',
    dueDate: '12/10/2022'
  }, {
    name: 'clean the floor',
    dueDate: '12/10/2022'
  }];

// executa a função no carregamento da página para carregar os itens que já existirem no array.
renderTodoList();


function renderTodoList() {
  // Inserindo o resultado do array em uma página HTML
  let listHTML = '';
  todoList.forEach((todoObject, index) => {
    // Shortcut para atribuir o valor dos objetos às variáveis de mesmo nome dos seus atributos.
    const { name, dueDate } = todoObject;
    /*
    É o mesmo que:
    const name = todoObject.name;
    const dueDate = todoObject.dueDate; 
        ou
    const { name } = todoObject;
    const { dueDate } = todoObject;
    */
    let itemHTML = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button 
        class="delete-todo-button js-delete-todo-button">Delete
      </button>
    `;
    listHTML += itemHTML;
  });

  // Aqui se usa o DOM para acessar a DIV e mandar o listHTML
  document.querySelector('.js-todo-list')
    .innerHTML = listHTML;
  
  // Executando o delete da tarefa usando o querySelectorAll -> neste caso é necessário pois teremos uma lista de botões delete com a mesma classe.
  document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
};

// Executando o insert ao pressionar o  'enter'
document.querySelector('.js-input-taskName')
  .addEventListener('keydown', (event) => {
    executeInsert(event);
  });

document.querySelector('.js-input-duedate')
  .addEventListener('keydown', (event) => {
    executeInsert(event);
  });

function executeInsert(event) {
  if (event.key === 'Enter') {
    insertTask();
  }
};

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    insertTask();
  });

function insertTask() {
  const inputTaskElement = document.querySelector('.js-input-taskName');
  const inputDueDateElement = document.querySelector('.js-input-duedate');
  const name = inputTaskElement.value;
  const dueDate = inputDueDateElement.value;
  
  todoList.push({
    //name: name,
    //dueDate: dueDate
    // se a propriedade e a variável tiverem o mesmo nome, basta digitar o nome da variável
    name,
    dueDate
  });

  // executa a função para atualizar a página HTML
  renderTodoList();

  //Limpa a textbox para a inserção da próxima task.
  inputTaskElement.value = '';
  inputDueDateElement.value = '0/00/0000';
};

