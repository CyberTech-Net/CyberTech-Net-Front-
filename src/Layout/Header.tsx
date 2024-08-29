import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import { RootState } from "../Storage/Redux/store";
import userModel from '../Interfaces/userModel';
import { emptyUserState, setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import UserBadge from '../Helper/userBadge';
import { useState } from 'react';

let logo = require("../Assets/img1.jpg");

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const [current, setCurrent] = useState('home');

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

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
              <Nav.Link className="App-link" href="/matchcard">Матчи</Nav.Link>
              <Nav.Link className="App-link" href="/teamrating">Рейтинг команд</Nav.Link>
              <Nav.Link className="App-link" href="/about">О проекте</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {userData.id && 
              (
                <UserBadge userData={userData} 
                handleLogout={handleLogout}   />
            )}
              
              {/* // (
              //   <NavDropdown title={`Вход: ${userData.name}`} id="basic-nav-dropdown">
              //     <NavDropdown.Item onClick={handleLogout}>Выйти</NavDropdown.Item>
              //   </NavDropdown>
              // ) */}


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