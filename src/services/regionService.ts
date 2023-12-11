import { RegionModel } from '../models';
import * as Errors from '../errors/customErrors';

const { RegionNotFoundError, RegionServerError } = Errors;

export async function createRegion(name: string, user: string) {
    try {
        return await RegionModel.create({ name, user });
    } catch (error) {
        console.error('Error creating region:', error);
        throw new RegionServerError();
    }
}

export async function getAllRegions() {
    try {
        return await RegionModel.find();
    } catch (error) {
        console.error('Error fetching regions:', error);
        throw new RegionServerError();
    }
}

export async function getRegionById(regionId: string) {
    try {
        const region = await RegionModel.findById(regionId);

        if (!region) {
            throw new RegionNotFoundError();
        }

        return region;
    } catch (error) {
        console.error('Error fetching region by ID:', error);
        throw new RegionServerError();
    }
}

export async function updateRegionById(regionId: string, name: string, user: string) {
    try {
        const updatedRegion = await RegionModel.findByIdAndUpdate(
            regionId,
            { name, user },
            { new: true }
        );

        if (!updatedRegion) {
            throw new RegionNotFoundError();
        }

        return updatedRegion;
    } catch (error) {
        console.error('Error updating region by ID:', error);
        throw new RegionServerError();
    }
}

export async function deleteRegionById(regionId: string) {
    try {
        const deletedRegion = await RegionModel.findByIdAndDelete(regionId);

        if (!deletedRegion) {
            throw new RegionNotFoundError();
        }

        return deletedRegion;
    } catch (error) {
        console.error('Error deleting region by ID:', error);
        throw new RegionServerError();
    }
}
