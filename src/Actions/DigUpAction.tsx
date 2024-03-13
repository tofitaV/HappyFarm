import {Action} from "./Action";
import {Plant} from "../Plant/Plants";
import {deletePlants} from "../API/PlantAPI";

export class DigUpAction implements Action {

    async doAction(plant: Plant) {
        try {
            return await deletePlants(plant);
        } catch (error) {
            console.error("Error deleting plant:", error);
            return null;
        }
    }
}