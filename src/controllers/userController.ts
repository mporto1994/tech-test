import { Request, Response } from 'express';
import * as UserService from '../services/userService';

export async function createUser(req: Request, res: Response) {
    try {
        console.log("controller");
        console.log(req.body);
        const { name, email, address, coordinates } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        console.log(name, email, address, coordinates);
        const newUser = await UserService.createUser(name, email, address, coordinates);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
        const user = await UserService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, email, address, coordinates } = req.body;

    try {
        const updatedUser = await UserService.updateUserById(userId, name, email, address, coordinates);

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
        const deletedUser = await UserService.deleteUserById(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir usuário por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}
