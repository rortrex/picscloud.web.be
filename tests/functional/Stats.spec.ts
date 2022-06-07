import { test } from '@japa/runner'
import StatsController from 'App/Controllers/Http/StatsController'
const stats = new StatsController()

test.group('Bytes calculs', () => {

    test('it should be 1 gigabytes', ({assert}) => {
        assert.equal(stats.convertBytesToGigabytes(1000000000), 1)
    })

    test('it should be 0.01 gigabytes', ({assert}) => {
        assert.equal(stats.convertBytesToGigabytes(10000000), 0.01)
    })

    test('it should be 2.5 gigabytes', ({assert}) => {
        assert.equal(stats.convertBytesToGigabytes(2540000000), 2.5)
    })

    test('it should be 25.4 gigabytes', ({assert}) => {
        assert.equal(stats.convertBytesToGigabytes(25400098700), 25.4)
    })

    test('it should be 1408 bytes', ({assert}) => {
        assert.equal(stats.sum([1024, 256, 128]), 1408)
    })
})

test.group('Percentages calculs', () => {

    test('it should be 0%', ({assert}) => {
        assert.equal(stats.percentagesOf(0, 100), 0)
    })

    test('it should be 10%', ({assert}) => {
        assert.equal(stats.percentagesOf(10, 100), 10)
    })

    test('it should be 93.5%', ({assert}) => {
        assert.equal(stats.percentagesOf(9350, 10000), 93.5)
    })

    test('it should be 9.41%', ({assert}) => {
        assert.equal(stats.percentagesOf(9413, 100000), 9.41)
    })
})
