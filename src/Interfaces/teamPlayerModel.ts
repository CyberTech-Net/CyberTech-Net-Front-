import playerModel from "./playerModel";
import teamModel from "./teamModel";

export default interface teamPlayerModel {
    id: string;
    team: teamModel;
    player: playerModel;
    fio: string;
    year1: string;
    year2: string
}