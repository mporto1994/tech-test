import { Request, Response } from 'express';
import * as RegionService from '../services/regionService';
import * as Errors from '../errors/customErrors';
import { handleErrors } from '../errors/errorsHandler';

const { InvalidRegionInputError } = Errors;

export async function createRegion(req: Request, res: Response) {
    try {
        const { name, user } = req.body;

        if (!name || !user) {
            throw new InvalidRegionInputError('Name and user are required');
        }

        const newRegion = await RegionService.createRegion(name, user);
        res.status(201).json(newRegion);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function getAllRegions(req: Request, res: Response) {
    try {
        const regions = await RegionService.getAllRegions();
        res.status(200).json(regions);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function getRegionById(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
        const region = await RegionService.getRegionById(regionId);
        res.status(200).json(region);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function updateRegionById(req: Request, res: Response) {
    const regionId = req.params.id;
    const { name, user } = req.body;

    try {
        const updatedRegion = await RegionService.updateRegionById(regionId, name, user);
        res.status(200).json(updatedRegion);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function deleteRegionById(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
        await RegionService.deleteRegionById(regionId);
        res.status(204).send();
    } catch (error) {
        handleErrors(error, res);
    }
}
