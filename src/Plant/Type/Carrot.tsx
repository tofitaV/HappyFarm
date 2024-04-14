import {Plant} from "../Plants";
import {PlantEnum} from "../PlantEnum";
import {toNumber} from "lodash";

export interface Carrot extends Plant {
    plantType: PlantEnum.Carrot
}

export function initCarrot(): Carrot {
    return {
        plantType: PlantEnum.Carrot,
        name: 'carrot',
        dateTime: new Date(),
        positionCol: -1,
        positionRow: -1,
        timeToGrow: 5,
        stageOfGrowing: 0,
        actualTimeToGrow: new Date(),
        isGrow: false,
        userId: toNumber(sessionStorage.getItem('id'))
    }
}