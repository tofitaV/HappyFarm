import {Plant} from "../Plants";
import {PlantEnum} from "../PlantEnum";

export interface Corn extends Plant {
    plantType: PlantEnum.Corn
}

export function initCorn(): Corn {
    return {plantType: PlantEnum.Corn, name: 'corn', dateTime: new Date(), positionCol: -1, positionRow: -1, timeToGrow: 1, stageOfGrowing: 0, actualTimeToGrow: new Date(), isGrow: false}
}