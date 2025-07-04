import {expect} from "chai";
import {GildedRose, Item} from "../app/gilded-rose";

describe('Unit tests', () => {
    it('Simple quality decrease', () => {
        expect(new GildedRose([new Item('itemName', 100, 10)]).updateQuality()[0]
            .quality)
            .to.equal(9);
    })
    it('Quality decrease cap', () => {
        expect(new GildedRose([new Item('itemName', 100, 0)]).updateQuality()[0]
            .quality)
            .to.equal(0);
    })
    it('Double quality decrease when expired', () => {
        expect(new GildedRose([new Item('itemName', 0, 10)]).updateQuality()[0]
            .quality)
            .to.equal(8);
    })
    it('Simple sellIn decrease', () => {
        expect(new GildedRose([new Item('itemName', 100, 10)]).updateQuality()[0]
            .sellIn)
            .to.equal(99);
    })
    it('Simple backstage quality increase', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 100, 10)]).updateQuality()[0]
            .quality)
            .to.equal(11);
    })
    it('Double backstage quality increase', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]).updateQuality()[0]
            .quality)
            .to.equal(12);
    })
    it('Triple backstage quality increase', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]).updateQuality()[0]
            .quality)
            .to.equal(13);
    })
    it('Simple backstage quality increase capped', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 100, 50)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Double backstage quality increase capped', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Triple backstage quality increase capped', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Triple backstage quality limited increase', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Backstage quality collapse when expired', () => {
        expect(new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]).updateQuality()[0]
            .quality)
            .to.equal(0);
    })
    it('Simple Aged Brie quality increase', () => {
        expect(new GildedRose([new Item('Aged Brie', 100, 10)]).updateQuality()[0]
            .quality)
            .to.equal(11);
    })
    it('Aged Brie quality increase cap', () => {
        expect(new GildedRose([new Item('Aged Brie', 100, 50)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Double Aged Brie quality increase', () => {
        expect(new GildedRose([new Item('Aged Brie', -1, 10)]).updateQuality()[0]
            .quality)
            .to.equal(12);
    })
    it('Aged Brie quality limited increase', () => {
        expect(new GildedRose([new Item('Aged Brie', -1, 49)]).updateQuality()[0]
            .quality)
            .to.equal(50);
    })
    it('Sulfuras no sellIn decrease', () => {
        expect(new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 100, 10)]).updateQuality()[0]
            .sellIn)
            .to.equal(100);
    })
    it('Sulfuras no quality change', () => {
        expect(new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 100, 10)]).updateQuality()[0]
            .quality)
            .to.equal(10);
    })
})
