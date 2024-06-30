import React from 'react';
import './Main.scss';
import {Navigate, Route, Routes} from "react-router";
import {News} from "@pages/news/News";
import {About} from "@pages/about/About";
import {TeamStatistics} from "@pages/teams/TeamStatistics";
import {TournamentsTable} from "@pages/tournaments/TournamentsTable";
import {Translations} from "@pages/translations/translations";
import {Bets} from "@pages/bets/Bets";
import LoginForm from "@pages/auth/login/LoginForm";
import {Logout} from "@pages/auth/logout/Logout";
import {AdminPage} from "@pages/admin/AdminPage";
import {useAppSelector} from "@hooks/reducs";

const Main = () => {
    return (
        <div className="main">
            <Routes>
                <Route path="/admin" element={<ProtectedRoute>
                    <AdminPage/>
                </ProtectedRoute>}/>
                <Route path="news" element={<News/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="tournaments" element={<TournamentsTable/>}/>
                <Route path="teams" element={<TeamStatistics/>}/>
                <Route path="translations" element={<Translations/>}/>
                <Route path="bets" element={<Bets/>}/>
                <Route path="signin" element={<LoginForm/>}/>
                <Route path="logout" element={<Logout/>}/>
                {/*<Route path="admin" element={<AdminPage/>}/>*/}

                <Route path="*" element={<News/>}/>



            </Routes>
        </div>


    );
};

// @ts-ignore
const ProtectedRoute = ({children}) => {
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
    if (!isAuth) {
        // user is not authenticated
        return <Navigate to="/signin"/>;
    }
    return children;
};

export default Main;