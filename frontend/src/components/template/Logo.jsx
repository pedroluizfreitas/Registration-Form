import './Logo.css'
import logo from '../../assets/imgs/Logo_TV_2015.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
    <aside className='logo'>
        <Link to='/' className='logo'>
        {/* alt serve para deficiente visual */}
            <img src={logo} alt='logo' />
        </Link>
    </aside>
)