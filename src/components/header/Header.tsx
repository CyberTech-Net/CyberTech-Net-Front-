import React from 'react';
import logo from '../../esports_logo.png';
import './Header.css';

const Header = () => {
    return (
        <aside className='header'>
            <img className="logo" src={logo} width={100}/>
        </aside>
    );
};

export default Header;