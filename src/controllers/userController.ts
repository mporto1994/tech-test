import { Request, Response } from 'express';
import { UserModel } from '../models';

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function createUser(req: Request, res: Response) {
    const { name, email, address, coordinates } = req.body;
    console.log(req.body);
    console.log(name);
    console.log(email);
    console.log(address);
    console.log(coordinates);
    try {
        const newUser = await UserModel.create({ name, email, address, coordinates });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function updateUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const { name, email, address, coordinates } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, address, coordinates },
            { new: true }
        );

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
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir usuário por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}
