import React from 'react';
import './Bets.scss';
import imageService from "@api/imageService";

export const Bets = () => {


    const news = [
        { id: 1, title: 'Команда по киберспорту выигрывает международный турнир', date: '2024-06-01', source: 'ESPN' },
        { id: 2, title: 'Топовый игрок по киберспорту присоединяется к новой команде', date: '2024-06-02', source: 'IGN' },
        { id: 3, title: 'Лига по киберспорту объявляет новый сезон', date: '2024-06-03', source: 'BBC Sport' },
        { id: 4, title: 'Киберспортивная организация получает крупное спонсорство', date: '2024-06-04', source: 'The Verge' },
        { id: 5, title: 'Обзор финала чемпионата по киберспорту', date: '2024-06-05', source: 'Kotaku' },
        { id: 6, title: 'Новая игра по киберспорту набирает популярность', date: '2024-06-06', source: 'Polygon' },
        { id: 7, title: 'Игрок по киберспорту устанавливает мировой рекорд', date: '2024-06-07', source: 'GameSpot' },
        { id: 8, title: 'Киберспортивная команда расширяется в новый регион', date: '2024-06-08', source: 'PC Gamer' },
        { id: 9, title: 'Киберспортивное событие устанавливает рекорд по просмотрам', date: '2024-06-09', source: 'Eurogamer' },
        { id: 10, title: 'Игрок по киберспорту получает престижную награду', date: '2024-06-10', source: 'Forbes' },
    ];
    return (
 <div> <h3>Можно тут поставить ставку на команду</h3>
     <div className="table-container">
        <table  className="news-table">
            <thead>
            <tr>
                {/*<th>ID</th>*/}

                <th>Лого</th>
                <th>Новость</th>
                <th>Дата</th>
                <th>Источник информации</th>
            </tr>
            </thead>
            <tbody>
            {news.map(item => (
                <tr key={item.id}>
                    <td><img className="news-mall-image" src={imageService.getImageUrl(`${item.id}.png`)}
                             alt="Example Image"/></td>
                    {/*<td>{item.id}</td>*/}
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.source}</td>
                </tr>
            ))}
            </tbody>
        </table>
     </div>
 </div>
    );

}