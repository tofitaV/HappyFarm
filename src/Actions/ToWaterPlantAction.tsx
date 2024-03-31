import {Action} from "./Action";
import {Plant} from "../Plant/Plants";
import {getPlants, nextPlantStage} from "../API/PlantAPI";

export class ToWaterPlantAction implements Action {

    async doAction(plant: Plant) {
        try {
            if (plant?.stageOfGrowing < 1)
                await nextPlantStage(plant);
                return await getPlants();
        } catch (error) {
            console.error("Error deleting plant:", error);
        }
    }
}