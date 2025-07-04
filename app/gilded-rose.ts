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

    rules = {
        'Aged Brie': item => {
            const newSellIn = item.sellIn - 1;
            const newQuality = item.quality >= this.MAX_QUALITY ?
                item.quality :
                Math.min(this.MAX_QUALITY,
                    item.sellIn <= 0 ?
                        item.quality + 2 :
                        item.quality + 1
                );

            return {newSellIn, newQuality};
        },
        'Sulfuras, Hand of Ragnaros': item => {
            return {newSellIn: item.sellIn, newQuality: item.quality};
        },
        'Backstage passes to a TAFKAL80ETC concert': item => {
            const newSellIn = item.sellIn - 1;
            const newQuality = [
                [item.sellIn <= 0, 0],
                [item.sellIn <= 5, item.quality >= this.MAX_QUALITY ?
                    item.quality :
                    Math.min(this.MAX_QUALITY, item.quality + 3)],
                [item.sellIn <= 10, item.quality >= this.MAX_QUALITY ?
                    item.quality :
                    Math.min(this.MAX_QUALITY, item.quality + 2)],
                [true, item.quality >= this.MAX_QUALITY ?
                    item.quality :
                    Math.min(this.MAX_QUALITY, item.quality + 1)],
            ].find(pair => pair[0])?.[1];

            return {newSellIn, newQuality};
        },
        'Conjured Mana Cake': item => {
            const newSellIn = item.sellIn - 1;
            const newQuality = item.quality < 0 ?
                item.quality :
                Math.max(this.MIN_QUALITY,
                    item.sellIn <= 0 ?
                        item.quality - 4 :
                        item.quality - 2
                );

            return {newSellIn, newQuality};
        },
    }
    defaultRule = item => {
        const newSellIn = item.sellIn - 1;
        const newQuality = item.quality < 0 ?
            item.quality :
            Math.max(this.MIN_QUALITY,
                item.sellIn <= 0 ?
                    item.quality - 2 :
                    item.quality - 1
            );

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
