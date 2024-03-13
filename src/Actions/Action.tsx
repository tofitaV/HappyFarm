import {Plant} from "../Plant/Plants";

export interface Action {
    doAction: (plant: Plant) => any
}