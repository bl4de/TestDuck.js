/**
 * Created by rafal.janicki on 2015-03-16.
 */
angular.module('StorePlusApp')
    .service("BasketService", function (StorageService) {
        return {
            // basket storage service
            storage: StorageService,

            // reference to StorageService.setStorageType method
            setStorageType: StorageService.setStorageType.bind(StorageService),

            // basket object
            basket: {
                id: 0,
                summary: 0.0,
                items: {},
                quantity: 0
            },

            // returns whole basket object
            getBasket: function () {
                this.basket = JSON.parse(this.storage.getValue("basket"));
                return this.basket;
            },

            // returns basket ID
            getId: function () {
                return this.basket.id > 0;
            },

            // sets basket ID
            setId: function () {
                if (!this.getId()) {
                    this.basket.id = Math.floor(Math.random() * 1000000);
                }
            },

            // recalculate total price of item (price * quantity)
            recalculateItemTotalPrice: function (item) {
                var quantity = parseInt(this.basket.items[item.id].quantity, 10),
                    price = parseFloat(this.basket.items[item.id].price);

                this.basket.items[item.id].total = quantity * price;
            },

            // recalculate total basket value
            recalculateBasketSummaryPrice: function () {
                var quantity,
                    price;

                // reset basket summary
                this.basket.summary = 0.0;

                for (var item in this.basket.items) {
                    quantity = parseInt(this.basket.items[item].quantity, 10);
                    price = parseFloat(this.basket.items[item].price);

                    if (quantity > 0 && price > 0) {
                        this.basket.summary = this.basket.summary + (price * quantity);
                    }
                }
            },

            // add item to basket
            // @item - product
            // @quantity - quantity; default = 1 piece
            addItem: function (item, quantity) {
                var __quantity = quantity || 1;

                if (!this.getId()) {
                    this.setId();
                }
                if (this.getItem(item.id)) {
                    this.basket.items[item.id].quantity += __quantity;
                } else {
                    this.basket.items[item.id] = item;
                    this.basket.items[item.id].quantity = __quantity;
                }

                this.basket.quantity += __quantity;
                this.recalculateItemTotalPrice(item);
                this.recalculateBasketSummaryPrice();

                this.storage.setValue("basket", JSON.stringify(this.basket));
            },

            // remove item from basket
            // @itemId - ID of item in basket.items
            // @quantity - how many pieces should be removed; default = all (whole product)
            removeItem: function (itemId, quantity) {
                var item = this.getItem(itemId),
                    __quantity = quantity || item.quantity;

                if (item && item.quantity >= __quantity) {
                    if (item.quantity - __quantity === 0) {
                        delete this.basket.items[item.id];
                    } else {
                        this.basket.items[item.id].quantity -= __quantity;
                        this.recalculateItemTotalPrice(item);
                    }
                }
                this.basket.quantity -= __quantity;
                this.recalculateBasketSummaryPrice();
                this.storage.setValue("basket", JSON.stringify(this.basket));
            },

            // remove selected items from basket
            // @items = array contains IDs of items to remove, eg. [123,321,982]
            removeItems: function (items) {
                var _self = this;

                if (items && items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        this.removeItem(items[i]);
                    }
                }
            },

            // returns item from basket
            // @itemId - ID of item in basket
            getItem: function (itemId) {
                for (var item in this.basket.items) {
                    if (parseInt(this.basket.items[item].id, 10) === parseInt(itemId, 10)) {
                        return this.basket.items[item];
                    }
                }
                return false;
            },

            // returns number of items in basket (group by ID)
            getItemsCount: function () {
                return this.basket.quantity;
            },

            // return total value of all items in basket
            getSummary: function () {
                return this.basket.summary;
            },

            getAllItems: function () {
                return JSON.parse(this.storage.getValue("basket"));
            }
        }
    });