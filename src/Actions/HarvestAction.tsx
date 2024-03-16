import {Action} from "./Action";
import {Plant} from "../Plant/Plants";
import {getPlants, plantHarvest} from "../API/PlantAPI";

export class HarvestAction implements Action {

    async doAction(plant: Plant) {
        try {
            if (plant?.isGrow === true) {
                await plantHarvest(plant);
                return await getPlants();
            }
        } catch (error) {
            console.error("Harvesting error:", error);
        }
    }
}