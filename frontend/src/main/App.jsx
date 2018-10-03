import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import React from 'react'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
// Não é necessário importar 'header' pq já está dentro de Main.
// Não é necessário importar 'Home' pq já está dentro de Routes.
// import Home from '../components/home/Home'
import Routes from '../main/Routes'
import Footer from '../components/template/Footer'

export default props => (
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav iconh="home" iconu="users" titlei="Start" titleu="Users" />
            {/* <Home /> */}
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
)