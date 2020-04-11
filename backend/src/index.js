const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];
function logRequest(request, response, next) {
  const {method, url} = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);
  // sempre é preciso colocar o next() para prosseguir a aplicação 
  // mmiddlewares é executado antes de chamar qq funcão neste caso.
  return next();

}
///aplica aqui para ser usado em toda aplicacao
//app.use(logRequest);

//o middleware pode ser aplicado em uma funcao específica
// e pode colcoar quantso quiser app.get('/projects', logRequest, middleware1, middleware2, (request, response)=> {
// é executado em sequencia
app.get('/projects', logRequest, (request, response)=> {
  const {title } = request.query;
  // console.log(title);
  // console.log(owner);
  const results= title 
  ? projects.filter(p=>p.title.includes(title)) 
  : projects;
  
  return response.json(results);
});


app.post('/projects',(request, response)=>{
  const {title, owner} = request.body;
  //console.log(body);

  const project = {id: uuid(), title, owner};
  projects.push(project);
  return response.json(project);

});


app.put('/projects/:id',(request, response)=>{
  // const params = request.params;
  // console.log(params);

  const {id} = request.params;
  const {title, owner} = request.body;
  //console.log(id);
  const projectIndex = projects.findIndex(p=>p.id===id);
  if(projectIndex<0){
      return response.status(400).json({
        error:'Não encontrado.'
      });
    }

    const project ={
      id,
      title,
      owner,
    };
    projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id',(request, response)=>{
 const {id} = request.params;
  
  //console.log(id);
  const projectIndex = projects.findIndex(p=>p.id===id);
  if(projectIndex<0){
      return response.status(400).json({
        error:'Não encontrado.'
      });
    }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333,()=>{
  console.log('✈ backend started!')
});