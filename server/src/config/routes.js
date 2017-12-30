const express = require('express')

module.exports = function(server) {
    // API Routes
    const router = express.Router()
    server.use('/api', router)


    // TODO Routes
    const todoService = require('../api/todo/todoService')
    // Nessa linha é feita o registro de todas as rotas para /todos - GET , PUT , DELETE , POST
    todoService.register(router,'/todos')
}
