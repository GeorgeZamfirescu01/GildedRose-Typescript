import { Item, GildedRose } from '../app/gilded-rose';
import { createWriteStream, createReadStream } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const fileName = 'goldenTest.txt';
const dirPath = __dirname;

export const daysToTest = 100;
export const testPath = path.join(dirPath, fileName);
export const itemListsToTest = [
    [new Item('Item1', 0, 0)],
    [new Item('Item1', 1, 0)],
    [new Item('Item1', 50, 0)],
    [new Item('Item1', 0, 1)],
    [new Item('Item1', 0, 50)],
    [new Item('Item1', 1, 1)],
    [new Item('Item1', 50, 50)],
    [new Item('Item1', 50, 100)],

    [new Item('Aged Brie', 0, 0)],
    [new Item('Aged Brie', 1, 0)],
    [new Item('Aged Brie', 50, 0)],
    [new Item('Aged Brie', 0, 1)],
    [new Item('Aged Brie', 0, 50)],
    [new Item('Aged Brie', 1, 1)],
    [new Item('Aged Brie', 50, 50)],
    [new Item('Aged Brie', 50, 100)],

    [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 0)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 50, 0)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 1)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 1, 1)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 50, 50)],
    [new Item('Backstage passes to a TAFKAL80ETC concert', 50, 100)],

    [new Item('Sulfuras, Hand of Ragnaros', 0, 0)],
    [new Item('Sulfuras, Hand of Ragnaros', 1, 0)],
    [new Item('Sulfuras, Hand of Ragnaros', 50, 0)],
    [new Item('Sulfuras, Hand of Ragnaros', 0, 1)],
    [new Item('Sulfuras, Hand of Ragnaros', 0, 50)],
    [new Item('Sulfuras, Hand of Ragnaros', 1, 1)],
    [new Item('Sulfuras, Hand of Ragnaros', 50, 50)],
    [new Item('Sulfuras, Hand of Ragnaros', 50, 100)],

    [
        new Item('Sulfuras, Hand of Ragnaros', 50, 100),
        new Item('Backstage passes to a TAFKAL80ETC concert', 50, 0),
        new Item('Item1', 1, 0),
        new Item('Aged Brie', 50, 50),
    ],
];

export function createResults(itemListsToTest: Item[][], daysToTest: number): Item[][][] {
    const itemsAndResults: Item[][][] = [];

    itemListsToTest.forEach(items => {
        const results: Item[][] = [JSON.parse(JSON.stringify(items))];
        const gildedRose = new GildedRose(JSON.parse(JSON.stringify(items)));
        for (let i = 0; i < daysToTest; i++) {
            results.push(JSON.parse(JSON.stringify(gildedRose.updateQuality())));
        }
        itemsAndResults.push(results);
    });

    return itemsAndResults;
}

function saveResults(path: string, itemsAndResults: Item[][][]) {
    let fileToBeWritten = createWriteStream(path);
    fileToBeWritten.write(JSON.stringify(itemsAndResults));
    fileToBeWritten.end();
}

export function parseSavedResults(path: string): Item[][][] {
    try {
        return JSON.parse(fs.readFileSync(path).toString());
    } catch (error) {
        console.log('There was an issue when trying to read the golden test file');
        return [];
    }
}

function setupGoldenTest(path: string) {
    saveResults(path, createResults(itemListsToTest, daysToTest));
}

setupGoldenTest(path.join(dirPath, 'copy_' + fileName));