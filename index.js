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

    app.post('/register', async (req, res) => {
        const {name, email, password}=req.body; 
        const user = await User.create({
          name: name,
          email: email,
          password: password
        })
          .catch(function(err){
            console.log(err)
          });
        res.json(user);
    });

    app.get('/users', async (req, res) => {
      const users = await User.findAll()
      .catch(function(err){
        res.send(`Erro: ${err}`)
      });
      console.log(users.every(user => user instanceof User)); // true
      console.log("All users:", JSON.stringify(users, null, 2));
      res.json(users);
    }); //Listar todos
    
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
    }); //Buscar

    app.put('/users/:id', async (req, res) => {
      const {email}=req.query;
      const {id}=req.params;
      await User.update({ email: email }, {
        where: {
          id: id
        }
      })
      .catch(function(err){
        res.send(`Erro ${err}`);
      });
      res.send('Ok')
    }); //Editar

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
    }); //Deletar
      
    app.listen(3000);