import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {SiteCreators} from "../contracts/about/AboutDto";
import {NewsList} from "../contracts/news/NewDto";
import newsService from "@api/newsService";


// Пример санкции для загрузки данных с сервера
export const getNewsList = createAsyncThunk<NewsList | unknown, void>(
    'news/fetchData', // Префикс типа экшена
    async () => {
        return await newsService.getData();
    }
);

interface initStateType {
    news?: NewsList,
    loading: boolean,
    error: string | null
}

// Создание slice с редюсером и экшенами
const initialState: initStateType = {
    news: {
        news: [],
    },
    loading: false,
    error: null
};

const newsDataSlice = createSlice({
    name: 'newsData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNewsList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNewsList.fulfilled, (state, action) => {
                //      state.loading = false;
                console.log("payload", action.payload as SiteCreators)
                const payload = action.payload as NewsList;


                state.news = payload;
                state.loading = false;
            })
            .addCase(getNewsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Неизвестная ошибка';
            });
    },
});

const {reducer} = newsDataSlice;

export default reducer;
