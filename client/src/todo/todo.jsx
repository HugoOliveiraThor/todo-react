import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'


export default class Todo extends Component {
    constructor(props) {
        super(props)
        // Sempre trabalhar com o objeto usar this.state
        this.state = { description: '', list: [] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/`: ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(result => this.setState({ ...this.state, description, list: result.data }))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }
     
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
        .then(result => this.refresh(this.state.description))
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
        .then(resp => this.refresh())
        // Eu garanti que o this que vai ser chamado é do componente, independente de onde for 
    }
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`,{...todo, done:true})
        .then(result => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
        .then(result => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }


    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    description={this.state.description} 
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange} 
                    handleSearch={this.handleSearch} 
                    handleClear={this.handleClear} />
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsPending ={this.handleMarkAsPending} 
                    handleMarkAsDone={this.handleMarkAsDone}  />
            </div>
        )
    }
}