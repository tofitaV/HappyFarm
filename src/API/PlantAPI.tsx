import {Plant} from "../Plant/Plants";
import axios, {AxiosHeaders} from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone
    }
});

export const createPlant = async (plant: Plant | null) => {
    try {
        await apiService.post('/plant', plant);
    } catch (error) {
        console.error('Error submitting plant data:', error);
    }
};

export const nextPlantStage = async (plant: Plant | null) => {
    try {
        const response = await apiService.post('/plant-stage', plant);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getPlants = async () => {
    try {
        const response = await apiService.get('/plant');
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const deletePlants = async (plant: Plant | null) => {
    try {
        const response = await apiService.post('/deletePlant', plant);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const plantHarvest = async (plant: Plant | null) => {
    try {
        const response = await apiService.post('/depot', plant);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getDepot = async () => {
    try {
        const response = await apiService.get('/depot');
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


