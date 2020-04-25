var bodyParser = require('body-parser');
const express = require('express');
const cors=require('cors');
const { User,Office} = require('./app/models');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())


    //Middlewares
    function logRequests(request, response, next){
      const {method, url}=request;
      const logLabel=`[${method.toUpperCase()}] ${url}`;
      console.log(logLabel);
      return next();
    }
    
    app.use(logRequests);

       
    //Dashboard

    app.get('/', (req, res) => {
        res.send('Home');
      });

    //-------------------------------------------------------------------
    //Rotas de Usuarios 
    app.post('/register', async (req, res) => {
        const {user_name, user_email, user_password,user_function}=req.body; 
        const user = await User.create({
          user_name: user_name,
          user_email: user_email,
          user_password: user_password,
          user_function: user_function
        })
          .catch(function(err){
            res.send(`Erro: ${err}`)
          });
        res.json(user);
    });//Criar usuario

    app.post('/logon', async (req, res) => {
      const {name, password}= req.body;
      console.log('logon');
      const user = await User.findAll({
        where: {
          user_name: name,
          user_password:password
        }
      }) 
      .catch(function(err){
        res.status(400).send(`Erro: ${err}`)
      });
      if(user.length > 0){
        res.json(user);
      }else{
        res.status(400).send();
      }
    });

    app.get('/users', async (req, res) => {
      const users = await User.findAll()
      .catch(function(err){
        res.send(`Erro: ${err}`)
      });
      res.json(users);
    }); //Listar todos os usuarios
    
    app.get('/users/:id', async (req, res) => {
      const {id}=req.params;
      const user = await User.findAll({
        where: {
          id: id
        }
      })
      .catch(function(err){
        res.send(`Erro: ${err}`)
      });
      res.json(user);
    }); //Buscar usuario

    app.patch('/changemail/:id', async (req, res) => {
      const {email}=req.query;
      const {id}=req.params;
      const result= await User.update({ user_email: email }, {
        where: {
          id: id
        }
      })
      .catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.status(200).json({'rows_affected': result});
    }); //Editar email

    app.patch('/changepassword/:id', async (req, res) => {
      const {password,new_password}=req.body;
      const {id}=req.params;
      console.log(id);
      console.log(password);
      
      const result=await User.update({ user_password: new_password }, {
        where: {
          id: id,
          user_password: password
        }
      })
      .catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.status(200).json({'rows_affected': result});
    }); //Editar senha de usuario
    

    app.delete('/users/:id', async (req, res) => {
      const {id}=req.params;
      console.log(id);
      const result= await User.destroy({
        where: {
          id: id
        }
      }).catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.status(200).json({'rows_affected': result});
    }); //Deletar usuario
      

    //----------------------------------------------------------------
    //Rotas de cargos
    app.post('/registeroffice', async (req, res) => {
      const {office_name}=req.body; 

      const office = await Office.create({
        office_name: office_name
      })
        .catch(function(err){
          console.log(err)
        });
      res.json(office);
  });//Criar cargo

  app.get('/offices', async (req, res) => {
    const offices = await Office.findAll()
    .catch(function(err){
      res.send(`Erro: ${err}`)
    });
    res.json(offices);
  }); //Listar todos os cargos

  app.patch('/changeofficename/:id', async (req, res) => {
    const {office_name}=req.query;
    const {id}=req.params;
    const result= await Office.update({ office_name: office_name }, {
      where: {
        id: id
      }
    })
    .catch(function(err){
      res.send(`Erro ${err}`);
    });
    res.status(200).json({'rows_affected': result});
  }); //Editar nome de cargo

  app.delete('/office/:id', async (req, res) => {
    const {id}=req.params;
    const result= await Office.destroy({
      where: {
        id: id
      }
    }).catch(function(err){
      res.send(`Erro ${err}`);
    });
    res.status(200).json({'rows_affected': result});
  }); //Deletar usuario
    app.listen(3333);

    