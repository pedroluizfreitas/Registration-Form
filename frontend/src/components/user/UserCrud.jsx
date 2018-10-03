import React, { Component } from 'react'
// Axios é um biblioteca HTTP
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Users',
    subtitle: 'User list: Include, List, Change and Delete.'
}

const initialPedro = {
    user: { name: '', email: '' },
    list: []
}
// URL do backend.
const baseUrl = 'http://localhost:3001/users'

export default class UserCrud extends Component {

    constructor(props) {
        super(props)
        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.getUpdatedList = this.getUpdatedList.bind(this)

    }

    state = { ...initialPedro }

    componentWillMount() {
        axios(baseUrl)
            .then(resp => {
                this.setState({ list: resp.data })
            })
    }

    clear() {
        this.setState({ user: initialPedro.user })
    }

    save() {

        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            // axios é um HTTP client baseado em promise, portanto usamos .then
            .then(resp => {
                // Vou querer alterar a lista que está dentro do atributo local chamado 'list=[]'
                // resp.data = Usuário que foi recebido a partir do webservice
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialPedro.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        // unshift = coloca um determinado elemento na primeira posição do array
        if (add) list.unshift(user)
        return list
    }

    // Criando um função para atualizar os campos
    updateField(event) {
        const user = { ...this.state.user }
        // event.target.value = Setar o valor que está dentro do meu campo de input
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    {/* Dispositivo celular: 12 colunas - Outros: 6 colunas */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Type your name..." />
                        </div>
                    </div>

                    {/* Criando o <div/> do e-mail */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Type your email..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    {/* Quero que para todo os dispostivos ele ocupe as 12 colunas */}
                    {/* Justaficando os botões para o final para que ele fique alinhado a direita */}
                    <div className="col-12 d-flex justify-content-end">

                        <button className='btn btn-primary'
                            onClick={this.save}>
                            Save
                        </button>

                        {/* Margin-left = ml-2 */}
                        <button className='btn btn-primary ml-2'
                            onClick={this.clear}>
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then(resp => {
                const list = this.getUpdatedList(user, false)
                this.setState({ list })
            })
    }

    renderTable() {
        // Retornando um expressão
        return (
            // Margin-top = mt-4 
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Chamando uma função responsável por renderizar as linhas */}
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // Vou mapear a lista de usuários que estão dentro do estado do meu objeto pra trechos de .jsx
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn"
                            onClick={() => this.load(user)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {

        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                <br />
                {this.renderTable()}
            </Main>
        )
    }
}