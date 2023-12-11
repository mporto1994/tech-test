import { modelOptions, pre, Prop, Ref } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Region } from './regionModel';
import { InvalidInputError, AddressNotFoundError } from '../errors/customErrors';
import { getAddressFromCoordinates, getCoordinatesFromAddress } from '../geoNominatimApi';

@pre<User>('save', async function (next) {
    const user = this as DocumentType<User> & User;

    if (user.isModified('coordinates') && user.isModified('address')) {
        return next(new InvalidInputError('Cannot update both coordinates and address simultaneously'));
    }

    if (user.isModified('coordinates')) {
        try {
            user.address = await getAddressFromCoordinates(user.coordinates);
        } catch (error) {
            return next(new AddressNotFoundError('Address not found'));
        }
    } else if (user.isModified('address')) {
        try {
            const coordinates = await getCoordinatesFromAddress(user.address);
            user.coordinates = coordinates;
        } catch (error) {
            return next(new AddressNotFoundError('Coordinates not found'));
        }
    }
    next();
})

@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class User {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true, type: () => [Number] })
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
