import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {SiteCreators} from "../contracts/about/AboutDto";
import aboutService from "@api/aboutService";


// Пример санкции для загрузки данных с сервера
export const getAboutInfo = createAsyncThunk<SiteCreators | unknown, void>(
    'about/fetchData', // Префикс типа экшена
    async () => {
        console.log("22222")
        const response = await aboutService.getData();
        console.log("ee", response);
        return response;
    }
);

// Создание slice с редюсером и экшенами
const initialState: SiteCreators = {
    editorial: {
        editorInChief: '',
        deputyEditorInChief: '',
    },
    authorsAndProofreader: [],
    proofreader: '',
    headOfStatisticsDepartment: '',
    articleAuthors: [],
    statisticsDepartment: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAboutInfo.pending, (state) => {
             //   state.loading = true;
             //   state.error = null;
            })
            .addCase(getAboutInfo.fulfilled, (state, action) => {
          //      state.loading = false;
                console.log("payload", action.payload as SiteCreators )
                const payload = action.payload as SiteCreators;
                state.editorial = payload.editorial;
                state.articleAuthors = payload.articleAuthors;
                state.authorsAndProofreader = payload.authorsAndProofreader;
                state.proofreader = payload.proofreader;
                state.headOfStatisticsDepartment = payload.headOfStatisticsDepartment;
                state.statisticsDepartment = payload.statisticsDepartment;
            })
            .addCase(getAboutInfo.rejected, (state, action) => {
                // state.loading = false;
                // state.error = action.error.message ?? 'Неизвестная ошибка';
            });
    },
});

const {reducer} = dataSlice;

export default reducer;
