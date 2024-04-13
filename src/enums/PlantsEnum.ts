import {PlantEnum} from "../Plant/PlantEnum";

export const plants = [
    {
        name: "Corn",
        id: 0,
        image: new URL("/assets/plants/corn.png", import.meta.url).href,
        type: PlantEnum.Corn
    },
    {
        name: "Carrot",
        id: 1,
        image: new URL("/assets/plants/carrot.png", import.meta.url).href,
        type: PlantEnum.Carrot
    },
    {
        name: "Pepper",
        id: 2,
        image: new URL("/assets/plants/pepper.png", import.meta.url).href,
        type: PlantEnum.Pepper
    },
    {
        name: "Seed",
        id: 3,
        image: new URL("/assets/plants/seed.png", import.meta.url).href,
        type: PlantEnum.Seed
    }
];