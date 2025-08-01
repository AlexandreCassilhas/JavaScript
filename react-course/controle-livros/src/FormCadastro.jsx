import React, {useState, useEffect} from "react";
import  {useForm} from "react-hook-form";
import { inAxios } from "../config_axios";

import iconLivros from "./assets/livros.webp"


import './FormCadastro.css';


function FormCadastro() {

  const {register, handleSubmit, reset} = useForm();

  const [aviso, setAviso] = useState("");

  async function salvar(dadosLivro) {
    
    try{
      const response =  await inAxios.post('livros', dadosLivro);
      setAviso(`Ok! Livro cadastrado com sucesso. Código: ${response.data.id}`)
    } catch(error){
      setAviso(`Erro...Não foi possível cadastrar o livro! Erro: ${error}`);
    }

    // setTimeout -> executa o comando após o tempo em milisegundos.
    setTimeout(() => {
      setAviso('');
    }, 5000);

    // Limpa os campos do formulário para a nova inclusão
    reset({
      titulo: '',
      autor: '',
      foto: '',
      anoPublicacao: '',
      preco: ''
    });
    // seta focus no campo título
    document.getElementById('titulo').focus();
    
  }

  return(
    <div>
      <div className="titulo-form">
        <h4>Módulo de Inclusão</h4>
      </div>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-livro">
          <div className="campo">
            <label htmlFor="titulo">Título:</label>
            <input type="text" name="nTitulo" id="titulo" required autoFocus placeholder="digite o título do livro" {...register('titulo')} />
          </div>
          <div className="campo">
            <label htmlFor="autor">
              Autor:</label>
            <input type="text" name="nAutor" id="autor" required placeholder="digite o autor do livro" {...register('autor')} />
          </div>
          <div className="campo">
            <label htmlFor="foto">
              URL:</label>
            <input type="text" name="nFoto" id="foto" placeholder="digite a URL da foto do livro" {...register('foto')} />
          </div>
          <div className="dois-campos">
            <div className="campo-um">
            <label htmlFor="anoPublicacao">
              Ano de Publicação:</label>
            <input className="class-ano" type="number" name="nAnoPublicacao" id="anoPublicacao" required step={1} min={1500} {...register('anoPublicacao')} />
            </div>
            <div className="campo-dois">
            <label htmlFor="preco">
              Preço (R$):</label>
            <input className="class-preco" type="number" name="nPreco" id="preco" required step={0.5} min={5} {...register('preco')} />
            </div>
          </div>
          <div className="botoes">
            <button className="form-buttons green-button" type="submit">Salvar</button>
            <button className="form-buttons red-button">Limpar</button>
          </div>
        </div>
      </form>
      <div className={aviso.startsWith('Ok')?  'msg-success': aviso.startsWith('Erro')? 'msg-error': ''}>{aviso}</div>
    </div>
  );
}

export default FormCadastro;