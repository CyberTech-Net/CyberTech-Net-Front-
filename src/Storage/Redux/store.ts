import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import { gameTypeReducer } from "./gameTypeSlice";
import { countryReducer } from "./countrySlice";
import { playerReducer } from "./playerSlice";
import authApi from "../../Api/authApi";
import fileApi from "../../Api/fileApi";
import gameTypeApi from "../../Api/gameTypeApi";
import countryApi from "../../Api/countryApi";
import playerApi from "../../Api/playerApi";
import tournamentApi from "../../Api/tournamentApi";
import teamApi from "../../Api/teamApi";
import infoApi from "../../Api/infoApi";
import { tournamentReducer } from "./tournamentSlice";
import { teamReducer } from "./teamSlice";
import { infoReducer } from "./infoSlice";
import { teamPlayerReducer } from "./teamPlayerSlice";
import teamPlayerApi from "../../Api/teamPlayerApi";
import matchApi from "../../Api/matchApi";
import { matchReducer } from "./matchSlice";


const store = configureStore ({
    reducer:{
        gameTypeItemStore: gameTypeReducer,
        userAuthStore: userAuthReducer,
        countryItemStore: countryReducer,
        playerItemStore: playerReducer,
        tournamentItemStore: tournamentReducer,
        teamItemStore: teamReducer,
        infoItemStore: infoReducer,
        teampleyerItemStore: teamPlayerReducer,
        matchItemStore: matchReducer,

        [authApi.reducerPath]: authApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
        [gameTypeApi.reducerPath]: gameTypeApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [playerApi.reducerPath]: playerApi.reducer,
        [tournamentApi.reducerPath]: tournamentApi.reducer,
        [teamApi.reducerPath]: teamApi.reducer,
        [infoApi.reducerPath]: infoApi.reducer,
        [teamPlayerApi.reducerPath]: teamPlayerApi.reducer,
        [matchApi.reducerPath]: matchApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat (authApi.middleware)
            .concat(fileApi.middleware)
            .concat (gameTypeApi.middleware)
            .concat (countryApi.middleware)
            .concat (playerApi.middleware)
            .concat (tournamentApi.middleware)
            .concat (teamApi.middleware)
            .concat (infoApi.middleware)
            .concat (teamPlayerApi.middleware)
            .concat (matchApi.middleware)
           
});

export type RootState = ReturnType<typeof store.getState>;

export default store;