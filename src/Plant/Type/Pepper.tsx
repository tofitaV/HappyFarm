import {PlantEnum} from "../PlantEnum";
import {PlantModel} from "../PlantModel";

export interface Pepper extends PlantModel {
    plantType: PlantEnum.Pepper
}

export function initPepper(): Pepper {
    return {
        plantType: PlantEnum.Pepper,
        positionCol: -1,
        positionRow: -1,
    }
}