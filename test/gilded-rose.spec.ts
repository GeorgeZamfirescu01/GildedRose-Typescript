import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import {createResults, itemListsToTest, daysToTest, parseSavedResults, testPath} from './golden-master-text-test';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    it('Tests the golden test', () => {
        const results = createResults(itemListsToTest, daysToTest);
        const expectedResults = parseSavedResults(testPath);
        expect(results.length).to.deep.equal(expectedResults.length);
        expect(results[0].length).to.deep.equal(expectedResults[0].length);
        expect(results[0][0].length).to.deep.equal(expectedResults[0][0].length);
        expect(results[0][0][0]).to.deep.equal(expectedResults[0][0][0]);
    });
});
