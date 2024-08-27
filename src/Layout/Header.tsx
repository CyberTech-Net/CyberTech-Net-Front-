//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
//import { MenuProps } from 'antd';
import { RootState } from "../Storage/Redux/store";
import userModel from '../Interfaces/userModel';
import { emptyUserState, setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { useState } from 'react';

let logo = require("../Assets/img1.jpg");

//type MenuItem = Required<MenuProps>['items'][number];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const [admin, SetAdmin] = useState(false);
  //const [current, setCurrent] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
    SetAdmin(false);
  };

  //SetAdmin(userData.role !== "admin")

  // const items: MenuItem[] = [
  //     {
  //       label: (
  //         <Image
  //           width={40}
  //           src={logo}
  //           alt="logo"
  //           title="Home"
  //         />
  //       ),
  //       key: 'home',
  //     },
  //     {
  //       label: 'CyberTech .Net',
  //       key: 'brand',
  //     },
  //     {
  //       label: 'AdminPanel',
  //       key: 'admin',
  //       children: [
  //         {
  //           label: 'GameTypes',
  //           key: 'gametypes',
  //         },
  //         {
  //           label: 'Tournament',
  //           key: 'tournament',
  //         },
  //         {
  //           label: 'Countries',
  //           key: 'countries',
  //         },
  //         {
  //           label: 'Players',
  //           key: 'players',
  //         },
  //         {
  //           label: 'Teams',
  //           key: 'teams',
  //         },
  //         {
  //           label: 'Info',
  //           key: 'info',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Ближайшие матчи',
  //       key: 'nextmatch',
  //     },
  //     {
  //       label: 'Рейтинг команд',
  //       key: 'teamrating',
  //     },
  //     {
  //       label: 'Статистика игроков',
  //       key: 'playerstat',
  //     },
  //     {
  //       label: 'О проекте',
  //       key: 'about',
  //     },
  //   ];

  //   const loginItems: MenuItem[] = [
  //     {
  //       label: 'Login',
  //       key: 'login',
  //     },

  //     {
  //       label: 'Register',
  //       key: 'register',
  //     },
  //   ]

  //   const onClick: MenuProps['onClick'] = (e) => {
  //     console.log('click ', e);
  //     setCurrent(e.key);
  //   };
  console.log(userData.role)
  
  return (
    
    <div>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Nav.Link className="App-link" aria-current="page" href="/">
            <img src={logo} style={{ height: '40px' }} className="m-1" title='Home' />
          </Nav.Link>
          <Navbar.Brand href="/">CyberTech .Net</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <NavDropdown title='Панель админа' id="basic-nav-dropdown" disabled={userData.role !== "admin"}>
                <NavDropdown.Item className="App-link" href="/info">Новости</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/countries">Страны</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/gametypes">Виды игр</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/players">Игроки</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/teams">Команды</NavDropdown.Item>
                <NavDropdown.Item className="App-link" href="/tournaments">Турниры</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="App-link" href="/viewmatch">Матчи</Nav.Link>
              <Nav.Link className="App-link" href="/teamrating">Рейтинг команд</Nav.Link>
              <Nav.Link className="App-link" href="/about">О проекте</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {userData.id && (
                <NavDropdown title={`Вход: ${userData.name}`} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Выйти</NavDropdown.Item>
                </NavDropdown>
              )}
              {!userData.id && (
                <>
                  <Nav.Link className="App-link" href="/login">
                    Логин
                  </Nav.Link>
                  <Nav.Link className="App-link" href="/register">
                    Регистрация
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;