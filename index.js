const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const { User } = require('./app/models');

User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });

    app.get('/', (req, res) => {
        res.send('Hello World!');
      });
    app.post('/register', async (req, res) => {
        const user = await User.create(req.body);
        res.json(user);
    });
    app.get('/users', (req, res) => {}); //Listar todos
    app.post('/users', (req, res) => {}); // Criar
    app.get('/users/:id', (req, res) => {}); //Buscar
    app.put('/users/:id', (req, res) => {}); //Editar
    app.delete('/users/:id', (req, res) => {}); //Deletar
      
    app.listen(3000);