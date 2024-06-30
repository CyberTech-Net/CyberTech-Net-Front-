import React, {useState} from 'react';
import './Navigation.scss';
import {useNavigate} from "react-router";
import {useAppSelector} from "@hooks/reducs";
// import logo from "*.png";


const Navigation = () => {

    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);

    const isAdmin = useAppSelector((state) => state.auth.isAdmin)

    const navigateTo = (selectBtn: number, path: string) => {
        setSelected(selectBtn);
        navigate(path);
    }


    return (
        <div>

            <nav className="navigation">
                <button className={`button ${selected == 0 ? 'active' : ''}`}
                        onClick={() => navigateTo(0, '/news')}>Новости
                </button>
                <button className={`button ${selected == 1 ? 'active' : ''}`} onClick={() => {
                    navigateTo(1, '/tournaments')
                }}>Турниры
                </button>
                <button className={`button ${selected == 2 ? 'active' : ''}`}
                        onClick={() => navigateTo(2, '/translations')}>Трансляции
                </button>
                <button className={`button ${selected == 3 ? 'active' : ''}`}
                        onClick={() => navigateTo(3, '/teams')}>Команды
                </button>
                <button className={`button ${selected == 4 ? 'active' : ''}`}
                        onClick={() => navigateTo(4, '/bets')}>Ставки
                </button>
                <button className={`button ${selected == 5 ? 'active' : ''}`} onClick={() => navigateTo(5, '/about')}>О
                    нас
                </button>

                {isAdmin &&
                    <button className={`button ${selected == 6 ? 'active' : ''}`}
                            onClick={() => navigateTo(6, '/admin')}>Админ панель
                    </button>

                }


            </nav>
        </div>

    );
};

export default Navigation;