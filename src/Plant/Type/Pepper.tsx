import {Plant} from "../Plants";
import {PlantEnum} from "../PlantEnum";
import {toNumber} from "lodash";

export interface Pepper extends Plant {
    plantType: PlantEnum.Pepper
}

export function initPepper(): Pepper {
    return {
        plantType: PlantEnum.Pepper,
        name: 'pepper',
        dateTime: new Date(),
        positionCol: -1,
        positionRow: -1,
        timeToGrow: 120,
        stageOfGrowing: 0,
        actualTimeToGrow: new Date(),
        isGrow: false,
        userId: toNumber(localStorage.getItem('id'))
    }
}