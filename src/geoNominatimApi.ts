import axios from 'axios';

async function getCoordinatesFromAddress(address: string): Promise<[number, number]> {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                format: 'json',
                q: address,
                limit: 1,
            },
        });

        const result = response.data[0];
        if (!result) {
            throw new Error('Address not found');
        }

        const coordinates: [number, number] = [parseFloat(result.lat), parseFloat(result.lon)];

        return coordinates;
    } catch (error) {
        console.error('Error getting coordinates from address:', error);
        throw new Error('Internal server error');
    }
}

async function getAddressFromCoordinates(coordinates: [number, number]): Promise<string> {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                format: 'json',
                lat: coordinates[0],
                lon: coordinates[1],
            },
        });

        const result = response.data;
        const address = result?.display_name || 'Address not found';
        return address;
    } catch (error) {
        console.error('Error getting address from coordinates:', error);
        throw new Error('Internal server error');
    }
}

function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

export { getCoordinatesFromAddress, getAddressFromCoordinates, calculateDistance };
