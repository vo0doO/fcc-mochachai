var chai = require('chai');
var assert = chai.assert;

suite('Unit Tests', function () {

  // Выполнить ВСЕ тесты
  // !! Не зашифруйте утверждения. Мы полагаемся на их заказ, чтобы проверить результаты!
  suite('Basic Assertions', function () {
    /** assert.fail() всегда потерпит неудачу Измени это на что-то более полезное... **/

    /** 1 - использование assert.isNull() или же assert.isNotNull() чтобы пройти испытания. **/
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'это необязательное описание ошибки - например, ноль ноль');
      assert.isNotNull(1, '1 не нуль');
    });

    /** 2 -Используйте assert.isDefined () или assert.isUndefined (), чтобы пройти тесты. **/
    test('#isDefined, #isUndefined', function () {
      assert.isDefined(null, 'ноль не является неопределенным');
      assert.isUndefined(undefined, 'не определено IS не определено');
      assert.isDefined('hello', 'строка не является неопределенной');
    });

    /** 3 -Используйте assert.isOk () или assert.isNotOk (), чтобы пройти тесты. **/
    // .isOk(truthy) а также .isNotOk(falsey) пройдет
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'ноль фальси');
      assert.isOk("Я правдив");
      assert.isOk(true, 'правда есть правда');
    });

    /** 4 - Используйте assert.isTrue () или assert.isNotTrue (), чтобы пройти тесты. **/
    // .isTrue (true) и .isNotTrue (все остальное) пройдут.
    // .isFalse () и .isNotFalse () также существуют.
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'правда это правда');
      assert.isTrue(!!'двойное отрицание', 'двойное отрицание правды верно');
      assert.isNotFalse({
        value: 'truthy'
      }, 'Истинный объект НЕ ИСТИНЕН (не является ложным ...)');
    });

    // Есть еще такие утверждения: .isNaN (), .isBoolean (),
    // и много других. Почти все утверждения в библиотеке чай
    // есть их отрицательный аналог - например, .isNotBoolean (),...
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    /** 5 - .equal(), .notEqual() **/
    // .equal() сравнивает объекты, используя '=='
    test('#equal, #notEqual', function () {
      assert.equal(12, '12', 'числа приводятся в строки с == ');
      assert.notEqual({
        value: 1
      }, {
        value: 1
      }, '== сравнивает ссылки на объекты');
      assert.equal(6 * '2', '12', 'no more hints...');
      assert.notEqual(6 + '2', '12', 'type your error message if you want');
    });
    /** 6 - .strictEqual(), .notStrictEqual() **/
    // .strictEqual() сравнивает объекты, используя '==='
    test('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6');
      assert.strictEqual(6, 3 * 2);
      assert.strictEqual(6 * '2', 12);
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
    });
    /** 7 - .deepEqual(), .notDeepEqual() **/
    // .deepEqual() утверждает, что два объекта глубоко равны
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({
        a: '1',
        b: 5
      }, {
        b: 5,
        a: '1'
      }, "порядок ключей не имеет значения");
      assert.notDeepEqual({
        a: [5, 6]
      }, {
        a: [6, 5]
      }, "Положение элементов массива имеет значение !!");
    });
  });

  // -----------------------------------------------------------------------------


  // Эта функция используется в тестах. Не редактируйте это.
  function weirdNumbers(delta) {
    return (1 + delta - Math.random());
  }

  suite('Comparisons', function () {

    /** 8 - .isAbove() => a > b , .isAtMost() => a <= b **/
    test('#isAbove, #isAtMost', function () {
      assert.fail('hello'.length, 5);
      assert.fail(1, 0);
      assert.fail(Math.PI, 3);
      assert.fail(1 - Math.random(), 1);
    });

    /** 9 - .isBelow() => a < b , .isAtLeast =>  a >= b **/
    test('#isBelow, #isAtLeast', function () {
      assert.fail('world'.length, 5);
      assert.fail(2 * Math.random(), 0);
      assert.fail(5 % 2, 2);
      assert.fail(2 / 3, 1);
    });

    /** 10 - .approximately **/
    // .approximately(actual, expected, range, [message])
    // actual = expected +/- range
    // Choose the minimum range (3rd parameter) to make the test always pass
    // it should be less than 1
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, /*edit this*/ 0);
      assert.approximately(weirdNumbers(0.2), 1, /*edit this*/ 0);
    });
  });

  // -----------------------------------------------------------------------------

  // These variables are used in the tests. Don't Edit them.
  var winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  var backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {

    /** 11 - #isArray vs #isNotArray **/
    test('#isArray, #isNotArray', function () {
      assert.fail('isThisAnArray?'.split(''), 'String.prototype.split() returns an Array');
      assert.fail([1, 2, 3].indexOf(2), 'indexOf returns a number.');
    });

    /** 12 - #include vs #notInclude **/
    test('Array #include, #notInclude', function () {
      assert.fail(winterMonths, 'jul', "It's summer in july...");
      assert.fail(backendLanguages, 'javascript', 'JS is a backend language !!');
    });
  });

  // -----------------------------------------------------------------------------

  // These variables are used in the tests. Don't Edit them.
  var formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {

    /** 13 - #isString asserts that the actual value is a string. **/
    test('#isString, #isNotString', function () {
      assert.fail(Math.sin(Math.PI / 4), 'a float is not a string');
      assert.fail(process.env.PATH, 'env vars are strings (or undefined)');
      assert.fail(JSON.stringify({
        type: 'object'
      }), 'a JSON is a string');
    });

    /** 14 - #include (on #notInclude ) works for strings too !! **/
    // It asserts that the actual string contains the expected substring
    test('String #include, #notInclude', function () {
      assert.fail('Arrow', 'row', "Arrow contains row...");
      assert.fail('dart', 'queue', "But a dart doesn't contain a queue");
    });

    /** 15 - #match Asserts that the actual value **/
    // matches the second argument regular expression.
    test('#match, #notMatch', function () {
      var regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.fail(formatPeople('John Doe', 35), regex);
      assert.fail(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // ----------------------------------------------------------------------------- 

  // These variables are used in the tests. Don't Edit them.
  var Car = function () {
    this.model = 'cedan';
    this.engines = 1;
    this.wheels = 4;
  };

  var Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  var myCar = new Car();
  var airlinePlane = new Plane();

  suite('Objects', function () {

    /** 16 - #property asserts that the actual object has a given property. **/
    // Use #property or #notProperty where appropriate
    test('#property, #notProperty', function () {
      assert.fail(myCar, 'wings', 'A car has not wings');
      assert.fail(airlinePlane, 'engines', 'planes have engines');
      assert.fail(myCar, 'wheels', 'Cars have wheels');
    });

    test('#typeOf, #notTypeOf', function () {

      /** 17 #typeOf asserts that value’s type is the given string, **/
      // as determined by Object.prototype.toString.
      // Use #typeOf or #notTypeOf where appropriate
      assert.fail(myCar, 'object');
      assert.fail(myCar.model, 'string');
      assert.fail(airlinePlane.wings, 'string');
      assert.fail(airlinePlane.engines, 'array');
      assert.fail(myCar.wheels, 'number');
    });

    test('#instanceOf, #notInstanceOf', function () {

      /** 18 #instanceOf asserts that an object is an instance of a constructor **/
      // Use #instanceOf or #notInstanceOf where appropriate
      assert.fail(myCar, Plane);
      assert.fail(airlinePlane, Plane);
      assert.fail(airlinePlane, Object, 'everything is an Object');
      assert.fail(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});

/** 
 * Good Job, You are done here !!! 
 *  Please go to the file "2_functional_tests.js" ... 
 **/