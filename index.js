var bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

const { User } = require('./app/models');

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
            console.log(err)
          });
        res.json(user);
    });//Criar usuario

    app.get('/users', async (req, res) => {
      const users = await User.findAll()
      .catch(function(err){
        res.send(`Erro: ${err}`)
      });
      console.log("All users:", JSON.stringify(users, null, 2));
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
      await User.update({ user_email: email }, {
        where: {
          id: id
        }
      })
      .catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.send('Ok')
    }); //Editar email

    app.patch('/changepassword/:id', async (req, res) => {
      const {password,new_password}=req.body;
      const {id}=req.params;
      await User.update({ user_password: new_password }, {
        where: {
          id: id,
          user_password: password
        }
      })
      .catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.send('Ok')
    }); //Editar email de usuario
    

    app.delete('/users/:id', async (req, res) => {
      const {id}=req.params;
      console.log(id);
      await User.destroy({
        where: {
          id: id
        }
      }).catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.send('OK');
    }); //Deletar usuario
      

    //----------------------------------------------------------------
    //Rotas de cargos
    app.post('/registeroffice', async (req, res) => {
      const {office_name}=req.body; 
      const user = await Office.create({
        user_name: office_name,
      })
        .catch(function(err){
          console.log(err)
        });
      res.json(user);
  });//Criar cargo

  app.patch('/changeofficename/:id', async (req, res) => {
    const {office_name}=req.query;
    const {id}=req.params;
    await Office.update({ office_name: office_name }, {
      where: {
        id: id
      }
    })
    .catch(function(err){
      res.send(`Erro ${err}`);
    });
    res.send('Ok')
  }); //Editar email de usuario

    app.listen(3000);