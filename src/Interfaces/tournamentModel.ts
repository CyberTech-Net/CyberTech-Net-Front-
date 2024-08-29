import gameTypeModel from "./gameTypeModel";

export default interface tournamentModel {
    id: string;
    gameType: gameTypeModel;
    titleTournament: string;
    typeTournament: string;
    dateTournamentInit: string;
    dateTournamentEnd: string;
    placeName: string;
    earndTournament: number;
}