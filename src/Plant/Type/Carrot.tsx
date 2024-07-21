import {PlantEnum} from "../PlantEnum";
import {PlantModel} from "../PlantModel";

export interface Carrot extends PlantModel {
    plantType: PlantEnum.Carrot
}

export function initCarrot(): Carrot {
    return {
        plantType: PlantEnum.Carrot,
        positionCol: -1,
        positionRow: -1,
    }
}