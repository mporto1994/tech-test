import { pre, Prop, Ref } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Region } from './regionModel';

@pre<User>('save', async function (next) {
    const user = this as DocumentType<User> & User;

    if (user.isModified('coordinates')) {

        // user.address = await lib.getAddressFromCoordinates(user.coordinates);
    } else if (user.isModified('address')) {
        // const { lat, lng } = await lib.getCoordinatesFromAddress(user.address);
        // user.coordinates = [lng, lat];
    }

    next();
})

export class User {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    email!: string;

    @Prop()
    address: string;

    @Prop({ type: () => [Number] })
    coordinates: [number, number];

    @Prop({ required: true, default: [], ref: () => Region, type: () => String })
    regions: Types.Array<Ref<Region>>;

    constructor(args: { name: string, email: string, address: string, coordinates: [number, number]; }) {
        this.name = args.name;
        this.email = args.email;
        this.address = args.address;
        this.coordinates = args.coordinates;
    }
}

