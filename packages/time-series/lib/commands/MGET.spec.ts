import { strict as assert } from 'assert';
import testUtils, { GLOBAL } from '../test-utils';
import { transformArguments } from './MGET';

describe('MGET', () => {
    it('transformArguments', () => {
        assert.deepEqual(
            transformArguments('label=value'),
            ['TS.MGET', 'FILTER', 'label=value']
        );
    });

    testUtils.testWithClient('client.ts.mGet', async client => {
        await client.ts.add('key', 0, 0, {
            LABELS: { label: 'value' }
        });

        assert.deepEqual(
            await client.ts.mGet('label=value'),
            [{
                key: 'key',
                sample: {
                    timestamp: 0,
                    value: 0
                }
            }]
        );
    }, GLOBAL.SERVERS.OPEN);
});
