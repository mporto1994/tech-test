import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../app';

describe('User API Endpoints', () => {
    let userId: string;

    it('should create a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
        };

        const response = await supertest(app)
            .post('/api/users')
            .send(userData)
            .expect(201);

        const newUser = response.body;
        expect(newUser).to.exist;
        expect(newUser.name).to.equal(userData.name);
        expect(newUser.email).to.equal(userData.email);

        userId = newUser._id;
    });

    it('should get all users', async () => {
        const response = await supertest(app)
            .get('/api/users')
            .expect(200);

        const users = response.body;
        expect(users).to.exist;
        expect(users.rows).to.be.an('array');
    });

    it('should get user by ID', async () => {
        if (!userId) {
            assert.fail('User ID not available from previous test');
        }

        const response = await supertest(app)
            .get(`/api/users/${userId}`)
            .expect(200);

        const user = response.body;
        expect(user).to.exist;
        expect(user._id).to.equal(userId);
    });

    it('should update user by ID', async () => {
        if (!userId) {
            assert.fail('User ID not available from previous test');
        }

        const updatedData = {
            name: 'Updated John Doe',
            email: 'updated_john@example.com',
        };

        const response = await supertest(app)
            .put(`/api/users/${userId}`)
            .send(updatedData)
            .expect(200);

        const updatedUser = response.body;
        expect(updatedUser).to.exist;
        expect(updatedUser.name).to.equal(updatedData.name);
        expect(updatedUser.email).to.equal(updatedData.email);
    });

    it('should delete user by ID', async () => {
        if (!userId) {
            assert.fail('User ID not available from previous test');
        }

        await supertest(app)
            .delete(`/api/users/${userId}`)
            .expect(204);
    });
});
