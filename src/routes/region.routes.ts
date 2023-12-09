import express from 'express';
import * as regionController from '../controllers/regionController';

const regionRouter = express.Router();

regionRouter.get('/', regionController.getAllRegions);
regionRouter.get('/:id', regionController.getRegionById);
regionRouter.post('/', regionController.createRegion);
regionRouter.put('/:id', regionController.updateRegionById);
regionRouter.delete('/:id', regionController.deleteRegionById);

export default regionRouter;
