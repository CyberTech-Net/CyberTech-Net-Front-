import React from "react";
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/Header";
import {store} from "@store/store";
import {Provider} from "react-redux";
import Navigation from "@ui/sidebar/Navigation";
import Main from "@ui/main/Main";
import Footer from "@ui/footer/Footer";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                {/*<Header />*/}
                {/*<div className="middleSection">*/}
                {/*    <Navigation />*/}
                {/*    <Main/>*/}
                {/*</div>*/}
                {/*<Footer/>*/}

                <div className="container">
                    <Header />
                    {/*<Navigation/>*/}
                    <Main />
                    <Footer/>
                </div>

            </BrowserRouter>
        </Provider>
    );
}
