import {Plant} from "../Plant/Plants";
import axios, {AxiosHeaders} from 'axios';
import {FairModel} from "../Models/FairModel";
import {LeagueModel} from "../Models/LeagueModel";

const API_BASE_URL = 'https://2a0d-185-146-122-198.ngrok-free.app';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'ngrok-skip-browser-warning':69420
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
        return await response.data;
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

export const sellPlants = async (fairModel: FairModel) => {
    try {
        const response = await apiService.post('/fair', fairModel);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const myLeague = async () => {
    try {
        const response = await apiService.get('/myLeague');
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getLeagueLeaders = async (league: LeagueModel) => {
    try {
        const response = await apiService.post('/leagueUsers', league);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

