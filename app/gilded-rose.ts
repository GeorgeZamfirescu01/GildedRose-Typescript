export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    MAX_QUALITY = 50;
    MIN_QUALITY = 0;
    items: Array<Item>;

    maxBound = val => {
        return Math.min(this.MAX_QUALITY, val);
    }
    minBound = val => {
        return Math.max(this.MIN_QUALITY, val);
    }

    rules = {
        'Aged Brie': item => {
            const sellIn = item.sellIn;
            const quality = item.quality;
            const newSellIn = item.sellIn - 1;
            const newQuality =
                quality >= this.MAX_QUALITY ?
                quality :
                this.maxBound(sellIn <= 0 ? quality + 2 : quality + 1);

            return {newSellIn, newQuality};
        },
        'Sulfuras, Hand of Ragnaros': item => {
            const sellIn = item.sellIn;
            const quality = item.quality;
            return {newSellIn: sellIn, newQuality: quality};
        },
        'Backstage passes to a TAFKAL80ETC concert': item => {
            const sellIn = item.sellIn;
            const quality = item.quality;
            const newSellIn = sellIn - 1;
            const newQuality = [
                [sellIn <= 0, 0],
                [sellIn <= 5,
                    quality >= this.MAX_QUALITY ?
                    quality :
                    this.maxBound(quality + 3)],
                [sellIn <= 10,
                    quality >= this.MAX_QUALITY ?
                    quality :
                    this.maxBound(quality + 2)],
                [true,
                    quality >= this.MAX_QUALITY ?
                    quality :
                    this.maxBound(quality + 1)],
            ].find(pair => pair[0])?.[1];

            return {newSellIn, newQuality};
        },
        'Conjured Mana Cake': item => {
            const sellIn = item.sellIn;
            const quality = item.quality;
            const newSellIn = sellIn - 1;
            const newQuality =
                quality < 0 ?
                quality :
                this.minBound(sellIn <= 0 ? quality - 4 : quality - 2);

            return {newSellIn, newQuality};
        },
    }
    defaultRule = item => {
        const sellIn = item.sellIn;
        const quality = item.quality;
        const newSellIn = sellIn - 1;
        const newQuality =
            quality < 0 ?
            quality :
            this.minBound(sellIn <= 0 ? quality - 2 : quality - 1);

        return {newSellIn, newQuality};
    }

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            let rule = this.defaultRule;
            if (this.rules.hasOwnProperty(item.name)) {
                rule = this.rules[item.name];
            }

            const {newSellIn, newQuality} = rule(item)
            item.sellIn = newSellIn;
            item.quality = newQuality;
        }

        return this.items;
    }
}
