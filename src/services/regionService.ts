import { RegionModel } from '../models';
import * as Errors from '../errors/customErrors';

const { RegionNotFoundError, RegionServerError } = Errors;

export async function createRegion(name: string, user: string, coordinates: [number, number]) {
    try {
        coordinates.reverse(); // reverse coordinates because mongo geolocation requires inverse

        return await RegionModel.create({ name, user, coordinates });
    } catch (error) {
        console.error('Error creating region:', error);
        throw new RegionServerError();
    }
}

export async function getAllRegions(query: any) {
    try {
        const { centerCoordinates, maxDistance, userId } = query;
        let filter: any = {};

        if (centerCoordinates && maxDistance) {
            filter.coordinates = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: centerCoordinates.split(',').map(Number),
                    },
                    $maxDistance: maxDistance,
                },
            };
        }

        if (userId) {
            filter.user = { $ne: userId }; // $ne: not equal
        }

        const regions = await RegionModel.find(filter).populate('user');
        return regions;
    } catch (error) {
        console.error('Error fetching regions:', error);
        throw new RegionServerError();
    }
}

export async function getAllRegionsOnSpot(coordinates: string) {
    try {
        const regions = await RegionModel.find({
            coordinates: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates.split(',').map(Number),
                    },
                },
            },
        }).populate('user');

        return regions;
    } catch (error) {
        console.error('Error fetching regions by coordinates:', error);
        throw new RegionServerError();
    }
}


export async function getRegionById(regionId: string) {
    try {
        const region = await RegionModel.findById(regionId).populate('user');

        if (!region) {
            throw new RegionNotFoundError();
        }

        return region;
    } catch (error) {
        console.error('Error fetching region by ID:', error);
        throw new RegionServerError();
    }
}

export async function updateRegionById(regionId: string, name: string, user: string, coordinates: [number, number]) {
    try {
        const updatedRegion = await RegionModel.findByIdAndUpdate(
            regionId,
            { name, user, coordinates },
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
