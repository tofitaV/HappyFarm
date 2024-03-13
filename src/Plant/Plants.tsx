import {PlantEnum} from "./PlantEnum";

export interface Plant {
    plantType: PlantEnum
    name: string;
    dateTime: Date | null;
    positionCol: number;
    positionRow: number;
    timeToGrow: number
    actualTimeToGrow: Date
    stageOfGrowing: number
    isGrow: boolean
}