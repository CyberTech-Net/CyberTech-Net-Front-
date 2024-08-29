import { useEffect, useState } from 'react';
import { CountryPage, GameTypePage, HomePage, InfoPage, LoginPage,  MatchCardsPage,  NotFoundPage, RegisterPage, TeamRatingPage, TournamentPage } from '../Pages';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Storage/Redux/store';
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { jwtDecode } from "jwt-decode";
import '../dark-theme.css';
import userModel from '../Interfaces/userModel';
import { HeaderMenu, Footer } from '../Layout';
import PlayerPage from '../Pages/handbooks/PlayerPage';
import TeamPage from '../Pages/handbooks/TeamPage';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData = useSelector((state: RootState) => state.userAuthStore);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { name, id, email, role, phoneNumber }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ name, id, email, role, phoneNumber }));
    }
  }, []);

  return ( 
    <div>
      <HeaderMenu />  
          <> 
          <Routes>
            <Route path='/' element={<HomePage />}> </Route>
            <Route path='/countries' element={<CountryPage />}> </Route>
            <Route path='/players' element={<PlayerPage />}> </Route>
            <Route path='/teams' element={<TeamPage />}> </Route>
            <Route path='/gametypes' element={<GameTypePage />}> </Route>
            <Route path='/tournaments' element={<TournamentPage />}> </Route>
            <Route path='/info' element={<InfoPage />}> </Route>
            <Route path='/teamrating' element={<TeamRatingPage />}> </Route>
            <Route path='/matchcard' element={<MatchCardsPage />}> </Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/logout' element = {<HomePage/>}> </Route>
            <Route path='*' element={<NotFoundPage/>}></Route>
          </Routes>  
          </>
      <Footer /> 
    </div>
  );
}

export default App;