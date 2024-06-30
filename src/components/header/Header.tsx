import React from 'react';

import './Header.scss';
import Navigation from "@ui/sidebar/Navigation";

import logo from '@assets/esports_logo.png';
import {useNavigate} from "react-router";
import {useAppSelector} from "@hooks/reducs";

const Header = () => {

    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated)


    return (
        <header className="header-top">
            <div className="logo-container">
                <img className="logo" src={logo.toString()} width={60} alt=""/>
            </div>
            <Navigation/>
            <p>
                {!isAuth && (

                    <button className="button"
                            onClick={() => navigate('/signin')}>
                        Войти</button>
                ) ||  ( <button className="button"
                    onClick={() => navigate( '/logout')}>
                Выйти</button>)
            }
        </p>


</header>
)
    ;
};

export default Header;