import 'reflect-metadata';
import supertest from 'supertest';
import * as sinon from 'sinon';
import { assert, expect } from 'chai';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import app from '../src/app';
import '../src/database';
import { UserModel } from '../src/models';
import { User } from '../src/models/userModel';

let user;

describe('Models', () => {
    let savedUser;
    // const userInfo = {
    //     _id: new mongoose.Types.ObjectId(),
    //     name: 'test',
    //     email: 'test@mail-xxxx-server.com',
    //     address: 'some address',
    // };
    // beforeEach(async function () {
    //     const user = new UserModel(userInfo);
    //     savedUser = await user.save();
    //     console.log(user);
    // });
    // afterEach(async function () {
    //     await mongoose.connection.db.dropCollection('users');
    // });

    beforeAll(async function () {

        try {
            // const session = await mongoose.startSession();

            // // Iniciar uma transação
            // session.startTransaction();

            // console.log('Before create user');
            // console.log(UserModel);

            // user = await UserModel.create({
            //     name: "John Doe",
            //     email: "JhonDoe@email.com",
            //     address: "1 street, ",
            //     coordinates: [5, 5]
            // });
            // console.log('After create user');
        } catch (error) {
            console.error('Erro durante a criação do usuário:', error);
            throw error;
        }

    });
    beforeEach(async () => {
    });

    describe('UserModel', () => {
        it('should create a user', async () => {
            const newUser = await UserModel.create({
                name: 'John Doe',
                email: 'john@example.com',
                address: '123 Main St',
                coordinates: [5, 5]
            });

            expect(newUser).to.exist;
            expect(newUser.name).to.equal('John Doe');
            expect(newUser.email).to.equal('john@example.com');
            expect(newUser.address).to.equal('123 Main St');
        });

        // it('should update a user', async () => {
        //     const updatedUser = await UserModel.findByIdAndUpdate(
        //         user._id,
        //         {
        //             name: 'Updated John Doe',
        //             email: 'updated_john@example.com',
        //             address: '456 Updated St',
        //             coordinates: [0, 0]

        //         },
        //         { new: true }
        //     );

        //     expect(updatedUser).to.exist;
        //     expect(updatedUser?.name).to.equal('Updated John Doe');
        //     expect(updatedUser?.email).to.equal('updated_john@example.com');
        //     expect(updatedUser?.address).to.equal('456 Updated St');
        // });

        // it('should delete a user', async () => {
        //     const response = await supertest(app).delete(`/api/users/${user._id}`);

        //     expect(response).to.have.property('status', 200);
        //     expect(response.body).to.have.property('_id', user._id.toString());

        //     // Check if the user is deleted
        //     const deletedUser = await UserModel.findById(user._id);
        //     expect(deletedUser).to.be.null;
        // });
    });

    //     after(async () => {
    //         sinon.restore();

    //     });
    //     afterEach(() => {
    //     });
    // });

    // describe('RegionModel', () => {
    //     it('should create a region', async () => {
    //         const regionData: Omit<Region, '_id'> = {
    //             user: user._id,
    //             name: 'Test Region',
    //         };

    //         const [region] = await RegionModel.create([regionData]);

    //         expect(region).to.exist;
    //         expect(region.user).to.equal(user._id);
    //         expect(region.name).to.equal('Test Region');
    //     });

    //     it('should rollback changes in case of failure', async () => {
    //         const userRecord = await UserModel.findOne({ _id: user._id }).select('regions').lean();
    //         try {
    //             await RegionModel.create([{ user: user._id }]);

    //             assert.fail('Should have thrown an error');
    //         } catch (error) {
    //             const updatedUserRecord = await UserModel.findOne({ _id: user._id }).select('regions').lean();

    //             expect(userRecord).to.deep.equal(updatedUserRecord);
    //         }
    //     });
});

// describe('API Routes', () => {
//     it('should return a list of users', async () => {
//         const response = await supertest(app).get('/api/users');

//         expect(response).to.have.property('status', 200);
//         expect(response.body).to.be.an('array');
//     });

//     it('should return a user by ID', async () => {
//         const response = await supertest(app).get(`/api/users/${user._id}`);

//         expect(response).to.have.property('status', 200);
//         expect(response.body).to.have.property('_id', user._id.toString());
//     });
// });



