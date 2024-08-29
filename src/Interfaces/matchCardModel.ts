import teamModel from "./teamModel";
import tournamentModel from "./tournamentModel";

export default interface matchCardModel {
    id: string;
    firstTeam: teamModel;
    secondTeam: teamModel;
    tournament: tournamentModel;
    firstTeamScore: number;
    firstTeamResult: string;
    secondTeamScore: number;
    secondTeamResult: string;
    startDateTime: string;
}