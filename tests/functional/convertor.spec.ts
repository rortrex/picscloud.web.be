import { test } from '@japa/runner'
import ConvertorController from 'App/Controllers/ConvertorController'
const convertor = new ConvertorController()

test.group('ConvertorController', () => {

    test('it should be 1000000000 bytes and equal 1 gigabytes', ({assert}) => {
        assert.equal(convertor.convertBytesToGigabytes(1000000000), 1)
    })

    test('it should be 10000000 bytes and equal 0.01 gigabytes', ({assert}) => {
        assert.equal(convertor.convertBytesToGigabytes(10000000), 0.01)
    })

    test('it should be 2540000000 bytes and equal 2.5 gigabytes', ({assert}) => {
        assert.equal(convertor.convertBytesToGigabytes(2540000000), 2.5)
    })

    test('it should be 25400098700 bytes and equal 25.4 gigabytes', ({assert}) => {
        assert.equal(convertor.convertBytesToGigabytes(25400098700), 25.4)
    })

})
