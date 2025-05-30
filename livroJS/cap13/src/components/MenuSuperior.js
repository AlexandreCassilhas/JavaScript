import {link} from 'react-router-dom'

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
      <div className="container">
        <Link to='/' className="navbar-brand" href="#">Controle Pessoal de Livros</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to='/' className="nav-link" href="#">Inclusão</Link>
          </li>
          <li className="nav-item">
            <Link to='/manutencao' className="nav-link" href="#">Manutenção</Link>
          </li>
          <li className="nav-item"> 
            <Link to='/revisao' className="nav-link" href="#">Resumo</Link>
          </li>
          <li className="nav-item"> 
            <Link to='/' className="nav-link" href="#">Voltar</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MenuSuperior;