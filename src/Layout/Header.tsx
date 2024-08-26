import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import { Image, MenuProps } from 'antd';
import { RootState } from "../Storage/Redux/store";
import userModel from '../Interfaces/userModel';
import { emptyUserState, setLoggedInUser } from '../Storage/Redux/userAuthSlice';

let logo = require("../Assets/logo.png");
type MenuItem = Required<MenuProps>['items'][number];

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

    const items: MenuItem[] = [
        {
          label: (
            <Image
              width={40}
              src={logo}
              alt="logo"
              title="Home"
            />
          ),
          key: 'home',
        },
        {
          label: 'CyberTechNet',
          key: 'brand',
        },
        {
          label: 'AdminPanel',
          key: 'admin',
          children: [
            {
              label: 'GameTypes',
              key: 'gametypes',
            },
            {
              label: 'Tournament',
              key: 'tournament',
            },
            {
              label: 'Countries',
              key: 'countries',
            },
            {
              label: 'Players',
              key: 'players',
            },
            {
              label: 'Teams',
              key: 'teams',
            },
            {
              label: 'Info',
              key: 'info',
            },
          ],
        },
        {
          label: 'Хуки обычные',
          key: 'hooks',
        },
        {
          label: 'MUI',
          key: 'mui',
        },
        {
          label: 'Custom hooks',
          key: 'custom',
        },
      ];

      const loginItems: MenuItem[] = [
        {
          label: 'Login',
          key: 'login',
        },
      
        {
          label: 'Register',
          key: 'register',
        },
      ]
      
      const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
      };
      
        return (
          <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
              <Container>
                <Nav.Link className="App-link" aria-current="page" href="/">
                  <img src={logo} style={{ height: '40px' }} className="m-1" title='Home'/>
                </Nav.Link>
                <Navbar.Brand href="/">CyberTechNet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                
                    <NavDropdown title='AdminPanel' id="basic-nav-dropdown" disabled={false}>
                      <NavDropdown.Item className="App-link" href="/gametypes">Gametypes</NavDropdown.Item>
                      <NavDropdown.Item className="App-link" href="/tournamentPage">Tournaments</NavDropdown.Item>
                      <NavDropdown.Item className="App-link" href="/countries">Countries</NavDropdown.Item>
                      <NavDropdown.Item className="App-link" href="/players">Players</NavDropdown.Item>
                      <NavDropdown.Item className="App-link" href="/teams">Teams</NavDropdown.Item>
                      <NavDropdown.Item className="App-link" href="/info">Info</NavDropdown.Item>
                      
                    </NavDropdown>
      
                    <Nav.Link className="App-link" href="/hooks">Хуки обычные</Nav.Link>
                    <Nav.Link className="App-link" href="/mui">MUI</Nav.Link>
                    <Nav.Link className="App-link" href="/custom">Custom hooks</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                  <Nav className="me-auto">
                    {userData.id && (
                      <NavDropdown title={`Signed in as: ${userData.name}`} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    )}
                     {!userData.id && (
                      <>
                        <Nav.Link className="App-link" href="/login">
                          Login
                        </Nav.Link>
                        <Nav.Link className="App-link" href="/register">
                          Register
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