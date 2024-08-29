import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { RootState } from "../Storage/Redux/store";
import userModel from '../Interfaces/userModel';
import { emptyUserState, setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import UserBadge from '../Helper/userBadge';

const logo = require("../Assets/img1.png");

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  }, [dispatch, navigate]);

  const adminMenuItems = [
    { title: 'Новости', link: '/info' },
    { title: 'Страны', link: '/countries' },
    { title: 'Виды игр', link: '/gametypes' },
    { title: 'Игроки', link: '/players' },
    { title: 'Команды', link: '/teams' },
    { title: 'Турниры', link: '/tournaments' },
  ];

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} style={{ height: '40px' }} className="m-1" alt="Home" />
          CyberTech .Net
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title='Панель админа' id="admin-nav-dropdown" disabled={userData.role !== "admin"}>
              {adminMenuItems.map((item, index) => (
                <NavDropdown.Item key={index} href={item.link} className="text-light">{item.title}</NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link href="/matchcard">Матчи</Nav.Link>
            <Nav.Link href="/teamrating">Рейтинг команд</Nav.Link>
            <Nav.Link href="/about">О проекте</Nav.Link>
          </Nav>
          <Nav>
            {userData.id ? (
              <UserBadge userData={userData} handleLogout={handleLogout} />
            ) : (
              <>
                <Nav.Link href="/login">Логин</Nav.Link>
                <Nav.Link href="/register">Регистрация</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;