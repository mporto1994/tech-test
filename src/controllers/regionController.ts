import { Request, Response } from 'express';
import * as RegionService from '../services/regionService';
import * as Errors from '../errors/customErrors';
import { handleErrors } from '../errors/errorsHandler';

const { InvalidRegionInputError } = Errors;

export async function createRegion(req: Request, res: Response) {
    try {
        const { name, user, coordinates } = req.body;

        if (!name || !user || !coordinates) {
            throw new InvalidRegionInputError('Name and user are required');
        }

        const newRegion = await RegionService.createRegion(name, user, coordinates);
        res.status(201).json(newRegion);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function getAllRegions(req: Request, res: Response) {
    try {
        const { centerCoordinates, maxDistance, userId } = req.query;
        const regions = await RegionService.getAllRegions({ centerCoordinates, maxDistance, userId });
        res.status(200).json(regions);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function getAllRegionsOnSpot(req: Request, res: Response) {
    try {
        const { coordinates } = req.query;

        if (!coordinates) {
            return res.status(400).json({ message: 'Coordinates are required' });
        }

        const regions = await RegionService.getAllRegionsOnSpot(coordinates as string);
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
    const { name, user, coordinates } = req.body;

    try {
        const updatedRegion = await RegionService.updateRegionById(regionId, name, user, coordinates);
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
