import request from 'supertest'
import {app, HTTP_STATUS} from "../src";
const getRequest = () => {
    return request(app)
}

describe('/videos', () => {
    beforeAll(async () => {
        await getRequest().delete('/__test__/data')
    })
    it('should return 200 and empty array',async ()=> {
        await getRequest().get('/hometask_01/api/videos').expect(HTTP_STATUS.OK_200, [])
    });

})

