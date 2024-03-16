import {Plant} from "../Plants";
import {PlantEnum} from "../PlantEnum";
import {Carrot} from "./Carrot";

export interface Nothing extends Plant {
}

export function initNothing(): Nothing {
    return {plantType: PlantEnum.Nothing, name: 'nothing', dateTime: new Date(), positionCol: -1, positionRow: -1, timeToGrow: 1, stageOfGrowing: 0, actualTimeToGrow: new Date(), isGrow: false}
}

