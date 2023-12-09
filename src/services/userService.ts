import { UserModel } from '../models';
import { DocumentType } from '@typegoose/typegoose';

export async function createUser(name: string, email: string, address: string, coordinates: [number, number]) {
    try {
        return await UserModel.create({ name, email, address, coordinates });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw new Error('Erro interno do servidor');
    }
}

export async function getAllUsers() {
    try {
        return await UserModel.find();
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new Error('Erro interno do servidor');
    }
}

export async function getUserById(userId: string) {
    try {
        return await UserModel.findById(userId);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw new Error('Erro interno do servidor');
    }
}

export async function updateUserById(userId: string, name: string, email: string, address: string, coordinates: [number, number]) {
    try {
        return await UserModel.findByIdAndUpdate(
            userId,
            { name, email, address, coordinates },
            { new: true }
        );
    } catch (error) {
        console.error('Erro ao atualizar usuário por ID:', error);
        throw new Error('Erro interno do servidor');
    }
}

export async function deleteUserById(userId: string) {
    try {
        return await UserModel.findByIdAndDelete(userId);
    } catch (error) {
        console.error('Erro ao excluir usuário por ID:', error);
        throw new Error('Erro interno do servidor');
    }
}
