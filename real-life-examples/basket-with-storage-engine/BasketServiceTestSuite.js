/**
 * Created by rafal.janicki on 2015-03-17.
 */
function testSuite(obj) {


    var BasketService = obj,
        bsTestSuite = TestDuck.createTestSuite("BasketService test suite");

    // init BasketService
    BasketService.setStorageType("local");


    var product = {
        id: 11,
        name: 'sweterek',
        color: 'czerowny',
        price: "12.99",
        currency: "EUR"
    };

    var product2 = {
        id: 22,
        name: 'sukienka',
        color: 'niebieski',
        price: "29.99",
        currency: "EUR"
    };

    var product3 = {
        id: 33,
        name: 'spodnie',
        color: 'czarny',
        price: "34.69",
        currency: "EUR"
    };

    // add one product
    BasketService.addItem(product, 1);
    bsTestSuite.createSimpleTest("basket summary should equals 12.99", BasketService.getSummary() === 12.99, "add one product");
    bsTestSuite.createSimpleTest("basket should contains 1 item", BasketService.getItemsCount() === 1, "basket quantity");
    bsTestSuite.createSimpleTest("basket ID should be set to integer value from range 0 - 1000000: " + BasketService.getId(), BasketService.getId() > 0 , "basket quantity");

    // get product
    bsTestSuite.createSimpleTest("basket should contains one product object", BasketService.getItem(product.id) == product, "get product");

    // add second product
    BasketService.addItem(product, 1);
    bsTestSuite.createSimpleTest("basket summary should equals 25.98", BasketService.getSummary() === (12.99 * 2), "add second product");
    bsTestSuite.createSimpleTest("basket should contains 2 items", BasketService.getItemsCount() === 2, "basket quantity");

    // add third product
    BasketService.addItem(product2, 1);
    bsTestSuite.createSimpleTest("basket summary should equals 55.97", BasketService.getSummary() === (12.99 * 2 + 29.99), "add third product");
    bsTestSuite.createSimpleTest("basket should contains 3 items", BasketService.getItemsCount() === 3, "basket quantity");

    // add two products of type product3
    BasketService.addItem(product3, 2);
    bsTestSuite.createSimpleTest("basket summary should equals 125.35", BasketService.getSummary() === (12.99 * 2 + 29.99 + 34.69 * 2), "add third product");
    bsTestSuite.createSimpleTest("basket should contains 5 items", BasketService.getItemsCount() === 5, "basket quantity");

    //remove one product
    BasketService.removeItem(product.id, 1);
    bsTestSuite.createSimpleTest("basket summary should equals 112.36", BasketService.getSummary() === (12.99 * 1 + 29.99 + 34.69 * 2), "remove one product");
    bsTestSuite.createSimpleTest("basket should contains 4 items", BasketService.getItemsCount() === 4, "basket quantity");

    //remove all product3
    BasketService.removeItem(product3.id);
    bsTestSuite.createSimpleTest("basket summary should equals 42.98", BasketService.getSummary() === (12.99 * 1 + 29.99), "remove all product3 items");
    bsTestSuite.createSimpleTest("basket should contains 2 items", BasketService.getItemsCount() === 2, "basket quantity");

    // remove other products by IDs
    BasketService.removeItems([11, 22]);
    bsTestSuite.createSimpleTest("basket summary should equals 0.00", BasketService.getSummary() === 0.00, "remove all other items");
    bsTestSuite.createSimpleTest("basket should contains 0 items", BasketService.getItemsCount() === 0, "basket quantity");

    // run tests
    bsTestSuite.run();

    console.log(BasketService.getAllItems());

}