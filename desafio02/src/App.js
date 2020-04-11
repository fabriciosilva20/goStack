import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

import ListaRepository from './components/ListRepository';


function App() {
  const [repositories, setRepositories] =useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    })
  },[repositories]);

  

  async function  handleAddRepository() {

    const response = await api.post('repositories',{
       "title":"Titulo Novo", 
      "url":"URL nova", 
      "techs":"TECH nova"
    });

  const Repository = response.data;

  setRepositories([...repositories, Repository]);

  }

  return (
  <>
      <ListaRepository data={repositories} />
     
      <button type="button" onClick={handleAddRepository}>Novo Repository</button>
    </>  
  );
}

export default App;