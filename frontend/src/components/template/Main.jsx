import './Main.css'
import React from 'react'
import Header from './Header'

export default props => (
    // Vamos usar o React.Fragment para que não ocorra nenhum erro quando misturar o elemento .jsx main com o elemento .jsx header
    <React.Fragment>
        <Header {...props} />
        {/* Colocando o container - bootstrap */}
        <main className='content container-fluid'>
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>
)