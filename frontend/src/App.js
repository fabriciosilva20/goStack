import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import './App.css';

import background from './assets/back.jpg';

function App() {
  const [projects, setProjects] =useState([]);

  useEffect(()=>{
    api.get('projects').then(response=>{
      setProjects(response.data);
    })
  },[]);

  async function  handleAddProject() {
   // projects.push(`Novo projeto ${Date.now()}`);
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('projects',{
      title: `Novo projeto ${Date.now()}`,
      owner: "fabricio Morei da Silva"
    });

  const project = response.data;

  setProjects([...projects, project]);

  }

  return (
  <>
  <Header title="HomePage"/> 

    <img src={background} width="300" alt=""/>
      <ul>
      {projects.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Add Project</button>
    </>  
  );
}

export default App;