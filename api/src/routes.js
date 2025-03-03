const express = require('express');
const routes = express.Router();
const cd = require('./controllers/cd');
const discos = require('./controllers/disco');

routes.get('/', (req, res)=>{
    res.send('API Loja Respondendo!')
});

routes.post('/cd', cd.create)
routes.get('/cd', cd.read)
routes.put('/cd/:id', cd.update)
routes.delete('/cd/:id', cd.del)

routes.post('/discos', discos.create)
routes.get('/discos', discos.read)
routes.put('/discos/:id', discos.update)
routes.delete('/discos/:id', discos.del)

module.exports = routes;