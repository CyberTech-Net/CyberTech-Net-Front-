import teamModel from "./teamModel";
import tournamentModel from "./tournamentModel";

export default interface matchModel {
    id: string;
    tournament: tournamentModel;
    startDateTime: string;
    firstTeam: teamModel;
    secondTeam: teamModel;
}