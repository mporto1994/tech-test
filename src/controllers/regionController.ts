import { Request, Response } from 'express';
import { RegionModel } from '../models';

export async function getAllRegions(req: Request, res: Response) {
    try {
        const regions = await RegionModel.find();
        res.status(200).json(regions);
    } catch (error) {
        console.error('Erro ao buscar regiões:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function getRegionById(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
        const region = await RegionModel.findById(regionId);

        if (!region) {
            return res.status(404).json({ message: 'Região não encontrada' });
        }

        res.status(200).json(region);
    } catch (error) {
        console.error('Erro ao buscar região por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function createRegion(req: Request, res: Response) {
    const { name, user, coordinates } = req.body;

    try {
        const newRegion = await RegionModel.create({ name, user, coordinates });
        res.status(201).json(newRegion);
    } catch (error) {
        console.error('Erro ao criar região:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function updateRegionById(req: Request, res: Response) {
    const regionId = req.params.id;
    const { name, user, coordinates } = req.body;

    try {
        const updatedRegion = await RegionModel.findByIdAndUpdate(
            regionId,
            { name, user, coordinates },
            { new: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({ message: 'Região não encontrada' });
        }

        res.status(200).json(updatedRegion);
    } catch (error) {
        console.error('Erro ao atualizar região por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

export async function deleteRegionById(req: Request, res: Response) {
    const regionId = req.params.id;

    try {
        const deletedRegion = await RegionModel.findByIdAndDelete(regionId);

        if (!deletedRegion) {
            return res.status(404).json({ message: 'Região não encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir região por ID:', error);
        res.status(500).send('Erro interno do servidor');
    }
}
