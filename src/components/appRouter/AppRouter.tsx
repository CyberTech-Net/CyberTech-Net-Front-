import {Navigate, Route, Routes} from "react-router";
import LoginForm from "@pages/auth/login/LoginForm";
import React from "react";
import {RegisterForm} from "@pages/auth/register/RegisterForm";
import {HomePage} from "@pages/home/HomePage";
import {Logout} from "@pages/auth/logout/Logout";
import {useAppSelector} from "@hooks/reducs";
import {NotFound} from "@pages/notfound/NotFound";
import {AdminPage} from "@pages/admin/AdminPage";
import {News} from "@pages/news/News";
import {Translations} from "@pages/translations/translations";


export const AppRouter = () => {
    return (

        <Routes>
            <Route path="/admin" element={<ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/logout" element={<Logout/>}/>

            <Route path="/translations" element={<Translations/>}/>

            <Route path="/logout" element={<News/>}/>



            <Route path="/" element={
                <HomePage/>
            }></Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>

    );
};


// @ts-ignore
const ProtectedRoute = ({children}) => {
    const isAuth = useAppSelector((state) => state.auth.isAuthenticated)
    if (!isAuth) {
        // user is not authenticated
        return <Navigate to="/login"/>;
    }
    return children;
};