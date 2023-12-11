import { Response } from 'express';
import { CustomError } from '../errors/customErrors';

export function handleErrors(error: Error, res: Response) {
    if (error instanceof CustomError) {
        const errorName = error.name;

        switch (errorName) {
            case "InvalidInputError":
            case "DuplicateUserError":
                res.status(400).json({ message: error.message });
                break;
            case "UserNotFoundError":
            case "AddressNotFoundError":
                res.status(404).json({ message: error.message });
                break;
            case "InternalServerError":
                res.status(500).json({ message: error.message });
                break;
            case "InvalidRegionInputError":
            case "DuplicateRegionError":
                res.status(400).json({ message: error.message });
                break;
            case "RegionNotFoundError":
            case "RegionServerError":
                res.status(404).json({ message: error.message });
                break;
            default:
                console.error('Unexpected error:', error);
                res.status(500).send('Unexpected error');
        }
    } else {
        console.error('Unexpected error:', error);
        res.status(500).send('Unexpected error');
    }
}
