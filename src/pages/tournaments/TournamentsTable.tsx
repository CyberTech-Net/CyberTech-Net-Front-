import React from 'react';
import './TournamentsTable.scss';

export const TournamentsTable = () => {


    const tournaments = [
        { id: 1, name: 'The International', game: 'Dota 2', prizePool: '$40,018,195', year: 2021 },
        { id: 2, name: 'League of Legends World Championship', game: 'League of Legends', prizePool: '$6,450,000', year: 2021 },
        { id: 3, name: 'Fortnite World Cup', game: 'Fortnite', prizePool: '$30,000,000', year: 2019 },
        { id: 4, name: 'CS:GO Major Championships', game: 'Counter-Strike: Global Offensive', prizePool: '$1,000,000', year: 2020 },
        { id: 5, name: 'BlizzCon World Championships', game: 'StarCraft II', prizePool: '$700,000', year: 2019 },
        { id: 6, name: 'Call of Duty World League Championship', game: 'Call of Duty', prizePool: '$2,000,000', year: 2021 },
        { id: 7, name: 'Overwatch League Grand Finals', game: 'Overwatch', prizePool: '$1,700,000', year: 2020 },
        { id: 8, name: 'FIFA eWorld Cup', game: 'FIFA', prizePool: '$400,000', year: 2021 },
        { id: 9, name: 'Rocket League Championship Series', game: 'Rocket League', prizePool: '$1,000,000', year: 2021 },
        { id: 10, name: 'PUBG Global Championship', game: 'PUBG', prizePool: '$5,600,000', year: 2019 },
    ];

    return (
 <div> <h3>Турниры</h3>
     <div className="table-container">
        <table  className="news-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название турнира</th>
                <th>Игра</th>
                <th>Призовой фонд</th>
                <th>Год</th>
            </tr>
            </thead>
            <tbody>
            {tournaments.map(tournament => (
                <tr key={tournament.id}>
                    <td>{tournament.id}</td>
                    <td>{tournament.name}</td>
                    <td>{tournament.game}</td>
                    <td>{tournament.prizePool}</td>
                    <td>{tournament.year}</td>
                </tr>
            ))}
            </tbody>
        </table>
     </div>
 </div>
    );

}