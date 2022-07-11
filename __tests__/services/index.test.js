const { uuid } = require('../../Services/generateAuthKey');
const { hashCode } = require('../../Services/hashing');

describe.skip('services testing', () => {
    it('should be true', () => {
        const a = true
        expect(a).toBe(true)
    });
});

describe('hash and auth key generator', () => {
    it('should hash the passwords correctly ', () => {
        const hashed = 106033489;
        const password = 'osama';
        expect(hashCode(password)).toBe(hashed)
    });

    it.skip('should generate authentication key ', () => {
        // TODO using regexp, please make this tests
        const authKey = new RegExp('')

        expect(uuid()).toBe(authKey)
    });
});