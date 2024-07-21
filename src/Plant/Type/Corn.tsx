import {PlantEnum} from "../PlantEnum";
import {PlantModel} from "../PlantModel";

export interface Corn extends PlantModel {
    plantType: PlantEnum.Corn
}

export function initCorn(): Corn {
    return {
        plantType: PlantEnum.Corn,
        positionCol: -1,
        positionRow: -1
    }
}