/* jshint indent:4 */
/* global TestDuck */

/*
 TestDuckSample.js

 @description: sample test suite for TestDuck.js
 @author: "Rafal 'bl4de' Janicki",
 @created: 13.10.2014

 The MIT License (see LICENCE file)
 */
var TestDuck = TestDuck || {

		// constants
		DT_LINE_LENGTH: 110,

		testSuite: {},

		/*
		 simpleTest object:
		 simpleTest: {
		 testName: name of simple test
		 assertion: assertion to be checked
		 message: message to be displayed if assertion is true; otherwise default message 'Assertion failed'
		 }
		 */

		/*
		 InitTestSuite(object)

		 Create test suite with some test as JSON object and
		 pass it to this method - the rest TestDuck will do for you
		 automatically

		 testSuiteObj: {
		 testSuiteName: <string> Test Suite Name
		 tests: [
		 {
		 testName: name of simple test
		 assertion: assertion to be checked
		 message: message to be displayed if assertion is true; otherwise default message 'Assertion failed'
		 }
		 ]
		 }
		 */
		initTestSuite: function (testSuiteObj) {

			var __testSuite;

			if (testSuiteObj.hasOwnProperty("testSuiteName")
				&& testSuiteObj.hasOwnProperty("tests")
				&& testSuiteObj.tests.length > 0) {
				// create test suite
				__testSuite = TestDuck.createTestSuite(testSuiteObj.testSuiteName);

				// add tests
				testSuiteObj.tests.forEach(function (__simpleTest) {
					__testSuite.addTest(__simpleTest);
				});

				// run
				__testSuite.run();
			}
		},


		/*
		 TestSuite

		 __testSuiteName: name of particular test suite
		 __simpleTest: simpleTest object

		 */
		createTestSuite: function (testSuiteName) {
			var __testSuiteName = testSuiteName || "TestDuck test suite",
				_lineLength = TestDuck.DT_LINE_LENGTH;

			/*
			 __simpleTest - instance of TestDuck.simpleTest
			 */
			var __addTest = function (__simpleTest) {
				TestDuck.testSuite[__testSuiteName].push(__simpleTest);
			};

			var __init = function () {
				TestDuck.testSuite[__testSuiteName] = [];
				return this;
			};

			// prints line in console, with fixed length
			this.__print = function (__str, __format, __format2) {
				var _strLength = (__format2) ? __str.length - 2 : __str.length,
					_padding = (_strLength < _lineLength) ? " ".repeat(_lineLength - _strLength) : "";


				__str = __str + _padding;
				if (__format2) {
					console.log(__str, __format, __format2);
				} else {
					console.log(__str, __format);
				}
			};


			// public interface

			// add simple test
			this.addTest = function (__simpleTest) {
				__addTest(__simpleTest);
				return this;
			};

			// create and add simple test
			this.createSimpleTest = function (_testName, _assertion, _message) {
				__addTest({
					testName: _testName,
					assertion: _assertion,
					message: _message
				});
				return this;
			};


			// run test suite
			this.run = function () {
				var _self = this,
					_total,
					i,
					_passed = 0,
					_passedBar = "",
					_passedPercentage,
					_failed = 0,
					_failedBar = "",
					_failedPercentage;

				_total = TestDuck.testSuite[__testSuiteName].length;

				if (TestDuck.testSuite[__testSuiteName] && TestDuck.testSuite[__testSuiteName].length > 0) {

					this.__print("%c *** TestDuck test suite runner ***   ", "font-weight:bold; background-color:#ddd; color:#111; border-top:2px solid #444;border-bottom:4px solid #ddd;");
					this.__print("%c *** " + __testSuiteName + " ***   ", "font-weight:bold; background-color:#ddd; color:#111;  border-bottom:4px solid #666;");

					TestDuck.testSuite[__testSuiteName].forEach(function (__test) {
						if (__test.assertion === true) {
							_self.__print("%c" + " [+]   PASSED: " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#206f20;border-bottom:4px solid #206f20;",
								"color:#eee; background-color:#01aa01;border-bottom:4px solid #01aa01;");
							_passed++;
						} else {
							_self.__print("%c" + " [-]   FAIL:   " + "%c " + __test.message + "  (" + __test.testName + ")  ",
								"color:#fff; font-weight:bold; background-color:#a01111;border-bottom:4px solid #a01111;",
								"color:#eee; background-color:#f33;border-bottom:4px solid #f33;");
							_failed++;
						}
					});
					this.__print("%c ***           SUMMARY           *** ", "font-weight:bold; background-color:#ddd; color:#111; border-top:4px solid #666;border-bottom:4px solid #ddd;");

					_passedPercentage = parseInt((_passed / _total) * 100, 10);
					_failedPercentage = parseInt((_failed / _total) * 100, 10);
					this.__print("%c  total tests run: " + _total + "                 ", "background-color:#eee; color:#222; font-weight:bold;border-bottom:4px solid #eee;");

					for (i = 0; i < (10 - (_passedPercentage / 10)); i++) {
						_failedBar += "---";
					}

					while (i < 10) {
						_passedBar += "+++";
						i++;
					}

					this.__print("%c  " + _passedBar + "%c" + _failedBar + "     ",
						"font-weight:bold; background-color:#ddd; color:#206f20; border-bottom:4px solid #ddd;",
						"background-color:#ddd; font-weight:bold; color:#a01111; border-bottom:4px solid #ddd;");
					this.__print("%c  passed: " + _passed + " (" + _passedPercentage +
						"%)                  " + ((_passedPercentage > 99) ? " " : (_passedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#206f20;border-bottom:4px solid #eee;");
					this.__print("%c  failed: " + _failed + " (" + _failedPercentage +
						"%)                  " + ((_failedPercentage > 99) ? " " : (_failedPercentage < 10) ? "   " : "  "),
						"background-color:#eee; font-weight:normal; color:#a01111;border-bottom:4px solid #eee;");

					this.__print("%c *** TestDuck says: I'm done :P *** ", "font-weight:bold; background-color:#ddd; color:#111; border-bottom:2px solid #444;");

					// empty line separator
					console.log(" ");
					console.log(" ");

				}
			};

			__init();
			return this;
		}
	};

// create testSuite
var testSuite = TestDuck.createTestSuite("Sample test suite");


// two simple test - first should pass, second shouldn't
var test1 = {
		testName: "Test one",
		assertion: 1 == 1,
		message: "Indeed, one equals one :P"
	},
	test2 = {
		testName: "Test two",
		assertion: "TestDuck".length > 10,
		message: "Uh oh, TestDuck has more than 10 signs, surprising... :P"
	};

// add these tests to testSuite
testSuite
	.addTest(test1)
	.addTest(test2);

// alternative method of adding simple test - using delegated method createSimpleTest(name, assertion, message)

testSuite.createSimpleTest("Another simple test", (10 % 3 === 1), "Yes, 10 modulo 3 equals 1");
testSuite.createSimpleTest("Yet another simple test", (12 + 12 === 24), "Yes, 12 plus 12 equals 24, nothing surprising here :)");
testSuite.createSimpleTest("And yet another simple test", (12 + 12 === 25), "Uh, oh, 12 plus 12 not equals 25? :/ ");

// run testSuite
testSuite.run();


// simple function for test test :P
function someFuncToTest(x, y) {
	return x + y;
}


//initTestSuite(testSuiteObj)
var newtest = {
	testSuiteName: "Car brands name lenght",
	tests: [
		{
			testName: "Audi",
			assertion: "Audi".length === 4,
			message: "Audi"
		},
		{
			testName: "BMW",
			assertion: "BMW".length === 2,
			message: "BMW"
		},
		{
			testName: "Aston Martin",
			assertion: "Aston Martin".length === 12,
			message: "Aston Martin"
		},
		{
			testName: "Ferrari",
			assertion: "Ferrari".length === 7,
			message: "Ferrari"
		},
		{
			testName: "Maserati",
			assertion: "Maserati".length === 8,
			message: "Maserati"
		},
		{
			testName: "Ford",
			assertion: "Ford".length === 4,
			message: "Ford"
		},
		{
			testName: "Opel",
			assertion: "Opel".length === 5,
			message: "Opel"
		},
		{
			testName: "Function",
			assertion: someFuncToTest(10, 20) === 33,
			message: "10 + 20 = 33? :P"
		}
	]
};

TestDuck.initTestSuite(newtest);
