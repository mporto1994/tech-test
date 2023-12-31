import 'reflect-metadata';
import * as mongoose from 'mongoose';
import { pre, Prop, Ref, modelOptions } from '@typegoose/typegoose';
import { User } from './userModel';
import { UserModel } from '.';

import ObjectId = mongoose.Types.ObjectId;


@pre<Region>('save', async function (next) {
    const region = this as Omit<any, keyof Region> & Region;

    if (!region._id) {
        region._id = new ObjectId().toString();
    }

    if (region.isNew) {
        const user = await UserModel.findOne({ _id: region.user });
        user.regions.push(region._id);
        await user.save({ session: region.$session() });
    }

    next(region.validateSync());
})
@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region {
    @Prop({ required: true, auto: true })
    _id: string;

    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, type: () => [Number] })
    coordinates: [number, number];

    @Prop({ ref: () => User, required: true })
    user: Ref<User>;

}
