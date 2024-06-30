import React, {useEffect} from 'react';
import './About.scss';
import {useAppSelector} from "@hooks/reducs";
import {useDispatch} from "react-redux";
import {getAboutInfo} from "@store/aboutSlice";
import authService from "@api/imageService";
import imageService from "@api/imageService";

export const About = () => {

    const team = useAppSelector((state) => state.about)

    console.log("22", team)

    const dispatch = useDispatch();


    useEffect(() => {
        // @ts-ignore
        dispatch(getAboutInfo());
    }, [dispatch]);


    return (
        <p className="about">
            <h2>Редакция</h2>

            <img className="small-image" src={imageService.getImageUrl("esports_logo.png")} alt="Example Image"/>

            <ul className="ul-about">
                <li><strong>Главный редактор:</strong> {team.editorial.editorInChief}</li>
                <li><strong>Заместитель главного редактора:</strong> {team.editorial.deputyEditorInChief}</li>
            </ul>

            <h2>Авторы:</h2>
            <ul  className="ul-about">

                {team.authorsAndProofreader.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <p><strong>Корректор:</strong> {team.proofreader}</p>

            <h2>Авторы статей:</h2>
            <ul  className="ul-about">
                {team.articleAuthors.map(item => (
                    <li key={item}>{item}</li>
                ))}

            </ul>

            <p><strong>Руководитель отдела статистики:</strong> {team.headOfStatisticsDepartment}</p>

            <h2>Отдел статистики:</h2>
            <ul  className="ul-about">
                {team.statisticsDepartment.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>


        </p>
    );

}