import { Request, Response } from 'express';
import * as UserService from '../services/userService';
import * as CustomErrors from '../errors/customErrors';
import { handleErrors } from '../errors/errorsHandler';

const { InvalidInputError, UserNotFoundError } = CustomErrors;

export async function createUser(req: Request, res: Response) {
    try {
        const { name, email, address, coordinates } = req.body;

        if (!name || !email) {
            throw new InvalidInputError('Name and email are required');
        }

        if (address && coordinates) {
            throw new InvalidInputError('Just one of address or coordinates needed');
        }

        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        return handleErrors(error, res);
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const users = await UserService.getAllUsers(page, limit);
        res.status(200).json(users);
    } catch (error) {
        return handleErrors(error, res);
    }
}

export async function getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
        const user = await UserService.getUserById(userId);

        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        return handleErrors(error, res);
    }
}

export async function updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const { address, coordinates } = req.body;

    try {
        if (address && coordinates) {
            throw new InvalidInputError('Just one of address or coordinates needed');
        }

        const updatedUser = await UserService.updateUserById(req.body, userId);

        res.status(200).json(updatedUser);
    } catch (error) {
        handleErrors(error, res);
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
        const deletedUser = await UserService.deleteUserById(userId);

        if (!deletedUser) {
            throw new UserNotFoundError('User not found');
        }

        res.status(204).send();
    } catch (error) {
        return handleErrors(error, res);
    }
}
