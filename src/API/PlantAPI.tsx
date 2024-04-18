import {Plant} from "../Plant/Plants";
import axios from 'axios';
import {FairModel} from "../Models/FairModel";
import {LeagueModel} from "../Models/LeagueModel";

const API_BASE_URL = 'https://0e61-185-146-122-198.ngrok-free.app';


const apiService = async () => {
    const id = sessionStorage.getItem('id');
    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'ngrok-skip-browser-warning': 69420,
            'id': id
        }
    });
}

export const createPlant = async (plant: Plant | null) => {
    try {
        await apiService().then(s => s.post('/plant', plant));
    } catch (error) {
        console.error('Error submitting plant data:', error);
    }
};

export const nextPlantStage = async (plant: Plant | null) => {
    try {
        const response = await apiService().then(s => s.post('/plant-stage', plant));
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
        const response = await apiService().then(s => s.get('/plant'));
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
        const response = await apiService().then(s => s.post('/deletePlant', plant));
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
        const response = await apiService().then(s => s.post('/depot', plant));
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
        const response = await apiService().then(s => s.get('/depot'));
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
        const response = await apiService().then(s => s.post('/fair', fairModel));
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
        const response = await apiService().then(s => s.get('/myLeague'));
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
        const response = await apiService().then(s => s.post('/leagueUsers', league));
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getDailySpin = async () => {
    try {
        const response = await apiService().then(s => s.get('/spin'));
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const getDailySpinRewards = async () => {
    try {
        const response = await apiService().then(s => s.get('/getSpinWheelRewards'));
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }
        return await response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


