import { expect } from 'chai'
import {createResults, itemListsToTest, daysToTest, parseSavedResults, testPath} from './golden-master-text-test';

describe('Gilded Rose', function () {
    it('Golden test', () => {
        const results = createResults(itemListsToTest, daysToTest);
        const expectedResults = parseSavedResults(testPath);
        expect(results.length).to.deep.equal(expectedResults.length);
        expect(results[0].length).to.deep.equal(expectedResults[0].length);
        expect(results[0][0].length).to.deep.equal(expectedResults[0][0].length);
        expect(results).to.deep.equal(expectedResults);
    });
});
