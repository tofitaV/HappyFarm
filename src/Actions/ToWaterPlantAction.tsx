import {Action} from "./Action";
import {Plant} from "../Plant/Plants";
import {nextPlantStage} from "../API/PlantAPI";

export class ToWaterPlantAction implements Action {

    doAction(plant: Plant) {
        try {
            if (plant?.stageOfGrowing < 1)
                return nextPlantStage(plant);
        } catch (error) {
            console.error("Error deleting plant:", error);
            return null;
        }
    }
}