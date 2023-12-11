import supertest from 'supertest';
import { assert, expect } from 'chai';
import app from '../app';

describe('Region API Endpoints', () => {
    let regionId: string;

    it('should create a new region', async () => {
        // adicionar user antes
        const regionData = {
            name: 'Test Region',
            user: 'user_id_here',
            coordinates: [34.193819, 134.471933],
        };

        const response = await supertest(app)
            .post('/api/regions')
            .send(regionData)
            .expect(201);

        const newRegion = response.body;
        expect(newRegion).to.exist;
        expect(newRegion.name).to.equal(regionData.name);
        expect(newRegion.user).to.equal(regionData.user);
        expect(newRegion.coordinates).to.deep.equal(regionData.coordinates);

        regionId = newRegion._id;
    });

    it('should get all regions', async () => {
        const response = await supertest(app)
            .get('/api/regions')
            .expect(200);

        const regions = response.body;
        expect(regions).to.exist;
        expect(regions.rows).to.be.an('array');
    });

    it('should get region by ID', async () => {
        if (!regionId) {
            assert.fail('Region ID not available from previous test');
        }

        const response = await supertest(app)
            .get(`/api/regions/${regionId}`)
            .expect(200);

        const region = response.body;
        expect(region).to.exist;
        expect(region._id).to.equal(regionId);
    });

    it('should update region by ID', async () => {
        if (!regionId) {
            assert.fail('Region ID not available from previous test');
        }

        const updatedData = {
            name: 'Updated Test Region',
            user: 'user_id_here',
            coordinates: [35.193819, 135.471933],
        };

        const response = await supertest(app)
            .put(`/api/regions/${regionId}`)
            .send(updatedData)
            .expect(200);

        const updatedRegion = response.body;
        expect(updatedRegion).to.exist;
        expect(updatedRegion.name).to.equal(updatedData.name);
        expect(updatedRegion.user).to.equal(updatedData.user);
        expect(updatedRegion.coordinates).to.deep.equal(updatedData.coordinates);
    });

    it('should delete region by ID', async () => {
        if (!regionId) {
            assert.fail('Region ID not available from previous test');
        }

        await supertest(app)
            .delete(`/api/regions/${regionId}`)
            .expect(204);
    });
});
