import * as Errors from '../errors/customErrors';
import { UserModel } from '../models';

const { UserNotFoundError, InvalidInputError, DuplicateUserError, InternalServerError, CustomError } = Errors;

export async function createUser(userData: {
    name: string, email: string, address?: string, coordinates?: [number, number];
}) {
    try {
        if (!userData.name || !userData.email) {
            throw new InvalidInputError('Name and email are required');
        }

        const existingUser = await UserModel.findOne({ email: userData.email });

        if (existingUser) {
            throw new DuplicateUserError('User with this email already exists');
        }

        return await UserModel.create(userData);
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            console.error('Error creating user:', error);
            throw new InternalServerError('Internal server error');
        }
    }
}

export async function getAllUsers(page: number, limit: number) {
    try {
        const users = await UserModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await UserModel.countDocuments();

        return {
            rows: users,
            page,
            limit,
            total,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new InternalServerError('Internal server error');
    }
}

export async function getUserById(userId: string) {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        return user;
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            console.error('Error fetching user by ID:', error);
            throw new InternalServerError('Internal server error');
        }
    }
}

export async function updateUserById(userData: { name: string, email: string, address?: string, coordinates?: [number, number]; }, userId: string) {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        for (const field in userData) {
            if (userData[field] !== undefined) {
                user[field] = userData[field];
            }
        }

        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            console.error('Error updating user by ID:', error);
            throw new InternalServerError('Internal server error');
        }
    }
}

export async function deleteUserById(userId: string) {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            throw new UserNotFoundError('User not found');
        }

        return deletedUser;
    } catch (error) {
        if (error instanceof CustomError) {
            throw error;
        } else {
            console.error('Error deleting user by ID:', error);
            throw new InternalServerError('Internal server error');
        }
    }
}
