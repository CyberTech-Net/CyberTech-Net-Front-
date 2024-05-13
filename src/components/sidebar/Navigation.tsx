import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <button className="button">Новости</button>
            <button className="button">Турниры</button>
            <button className="button">Трансляции</button>
            <button className="button">Команды</button>
            <button className="button">Ставки</button>
            <button className="button">О нас</button>
        </nav>
    );
};

export default Navigation;