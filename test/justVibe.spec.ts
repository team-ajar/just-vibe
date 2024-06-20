import { assert } from 'chai';
import axios from 'axios';
// import app functionality

// create axios instance
const instance = axios.create({
  baseURL: "http://localhost:3000"
});

describe('GET /', () => {
  it('send back 200 status code', () => {
    const { status }: any = axios.get('/');
    assert.equal(status, 200);
  })
})