import './ItemLista.css';

const ItemLista = (props) => {
  
  return(
    <tr>
      <td>{props.id}</td>
      <td>{props.titulo}</td>
      <td>{props.autor}</td>
      <td>{props.anoPublicacao}</td>
      <td>{Number(props.preco).toLocaleString("pt-br", {maximumFractionDigits: 2})}</td>
      <td><img src={props.foto} alt= "Capa do Livro" width="75" /></td>
      <td>
        <i className='exclui' title='Excluir'>&#10008;</i>
        <i className='altera' title='Alterar'>&#36;</i>
      </td>
    </tr>
  )
};

export default ItemLista;