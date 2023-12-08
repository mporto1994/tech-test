// models.ts
import { User } from './userModel';
import { Region } from './regionModel';
import { getModelForClass } from '@typegoose/typegoose';


export const RegionModel = getModelForClass(Region);
export const UserModel = getModelForClass(User);
