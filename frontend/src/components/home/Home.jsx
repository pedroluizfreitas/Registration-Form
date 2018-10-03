import React from 'react'
import Main from '../template/Main'

export default props => (
    <Main icon="home" title="Start"
        subtitle="Second Project of second Chapter">
        <div className='display-4'>Welcome!</div>
        <hr />
        <p className='mb-0' style={{fontSize:15}}>System developed to exemplify a registration form
                developed in React framework.</p>
    </Main>
)