import { useState } from 'react';
import {useForm} from 'react-hook-form';
import { inAxios } from '../config_axios';

const frm = document.querySelector('form')

const InclusaoLivros = () => {

  const {register, handleSubmit, reset} = useForm();
  // register -> define os nomes dos campos do form (e validações)
  // handleSubmit -> indica o método a ser acionado no evento onSubmit
  // reset -> para atribuir um valor aos campos registrados (para limpar o form)

  const [aviso, setAviso] = useState('');


  // método chamado ao enviar o form
  const salvar = async(campos) => {
    try{
      const response = await inAxios.post('livros', campos); 
      // complemento da URL definida no config_axios é 'livros' e o objeto JSON a ser enviado está em 'campos'
      setAviso(`Ok! Livro cadastrado com o código ${response.data.id}`)
    } catch (error) {
      setAviso(`Erro... Livro não cadastrado; ${error}`);
    }

    // setTimeout -> executa o comando após o tempo indicado em milisegundos
    setTimeout(() =>{
      setAviso('');
    }, 5000);

    // Limpa os campos dos formulários
    reset({titulo: '', autor: '', foto: '', anoPublicacao: '', preco: ''})

    // seta foco no primeiro campo do form
    frm.titulo.focus()
  }

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão</h4>
      <form onSubmit={handleSubmit(salvar)}> 
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input type="text" className="form-control" id="titulo" required autoFocus {...register('titulo')} />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <input type="text" className="form-control" id="autor" required {...register('autor')} />
        </div>
         <div className="form-group mt-2">
          <label htmlFor="foto">URL da Foto:</label>
          <input type="url" className="form-control" id="foto" required {...register('foto')} />
        </div>
        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="anoPublicacao">Ano de Publicação:</label> 
              <input type="number" className="form-control" id="anoPublicacao" required {...register('anoPublicacao')} />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="preco">Preço R$:</label>
              <input type="number" className="form-control" id="preco" step="0.01" required {...register('preco')}></input>
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary mt-3" value="Enviar" />
        <input type="reset" className="btn btn-danger mt-3" value="Limpar" />
      </form>
      <div className={aviso.startsWith('Ok!') ? "alert alert-success" : aviso.startsWith('Erro') ? "alert alert-danger" : ""}>{aviso}</div>
    </div>
  )
}

export default InclusaoLivros;