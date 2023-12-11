import express from 'express';
import * as regionController from '../controllers/regionController';

const regionRouter = express.Router();

regionRouter.post('/', regionController.createRegion);
regionRouter.get('/', regionController.getAllRegions);
regionRouter.get('/on-spot', regionController.getAllRegionsOnSpot);
regionRouter.get('/:id', regionController.getRegionById);
regionRouter.put('/:id', regionController.updateRegionById);
regionRouter.delete('/:id', regionController.deleteRegionById);

export default regionRouter;
