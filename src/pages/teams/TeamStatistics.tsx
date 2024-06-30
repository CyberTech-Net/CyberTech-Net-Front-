import React from 'react';
import './TeamStatistics.scss';
import imageService from "@api/imageService";

export const TeamStatistics = () => {



    const teamsData = [
        { id: 1, name: 'OG', discipline: 'Dota 2', winsLosses: '150 / 50', prizeMoney: '$15,000,000' },
        { id: 2, name: 'Team Liquid', discipline: 'CS:GO', winsLosses: '120 / 80', prizeMoney: '$10,000,000' },
        { id: 3, name: 'LGD Gaming', discipline: 'League of Legends', winsLosses: '130 / 70', prizeMoney: '$12,000,000' },
        { id: 4, name: 'Evil Geniuses', discipline: 'Dota 2', winsLosses: '140 / 60', prizeMoney: '$14,000,000' },
        { id: 5, name: 'Team Spirit', discipline: 'CS:GO', winsLosses: '110 / 90', prizeMoney: '$9,000,000' },
        { id: 6, name: 'Team Secret', discipline: 'Dota 2', winsLosses: '160 / 40', prizeMoney: '$16,000,000' },
        { id: 7, name: 'Newbee', discipline: 'Dota 2', winsLosses: '100 / 100', prizeMoney: '$8,000,000' },
        { id: 8, name: 'Virtus.pro', discipline: 'CS:GO', winsLosses: '130 / 70', prizeMoney: '$11,000,000' },
        { id: 9, name: 'Vici Gaming', discipline: 'Dota 2', winsLosses: '120 / 80', prizeMoney: '$10,000,000' },
        { id: 10, name: 'Wings Gaming', discipline: 'Dota 2', winsLosses: '90 / 110', prizeMoney: '$7,000,000' },
    ];

    return (
 <div> <h3>Рейтинг комманд</h3>
     <div className="table-container">
        <table  className="news-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Команда</th>
                <th>Дисциплина</th>
                <th>Победы / Поражения</th>
                <th>Призовые</th>
            </tr>
            </thead>
            <tbody>
            {teamsData.map(team => (
                <tr key={team.id}>
                    <td><img className="news-mall-image" src={imageService.getImageUrl(`${team.id}.png`)}
                             alt="Example Image"/></td>
                    <td>{team.name}</td>
                    <td>{team.discipline}</td>
                    <td>{team.winsLosses}</td>
                    <td>{team.prizeMoney}</td>
                </tr>
            ))}
            </tbody>
        </table>
     </div>
 </div>
    );

}