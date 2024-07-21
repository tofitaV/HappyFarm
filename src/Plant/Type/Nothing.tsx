
import {PlantEnum} from "../PlantEnum";
import {PlantModel} from "../PlantModel";

export interface Nothing extends PlantModel {
}

export function initNothing(): Nothing {
    return {
        plantType: PlantEnum.Nothing,
        positionCol: -1,
        positionRow: -1,
    }
}

