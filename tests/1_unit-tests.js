// @ts-nocheck
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
      assert.isAtMost('hello'.length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });

    /** 9 - .isBelow() => a < b , .isAtLeast =>  a >= b **/
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });

    /** 10 - .approximately **/
    // .приблизительно(фактический, ожидаемый, диапазон, [сообщение])
    // actual = expected +/- range
    // Выберите минимальный диапазон (третий параметр), чтобы тест всегда проходил
    //  должно быть меньше 1
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.999);
      assert.approximately(weirdNumbers(0.2), 1, 0.999);
    });
  });

  // -----------------------------------------------------------------------------

  // Эти переменные используются в тестах. Не редактируйте их.!
  var winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  var backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {

    /** 11 - #isArray против #isNotArray **/
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() возвращает массив');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf возвращает число.');
    });

    /** 12 - #include против #notInclude **/
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', "В июле лето ...");
      assert.include(backendLanguages, 'javascript', 'JS - это язык бэкэнда!');
    });
  });

  // -----------------------------------------------------------------------------

  // Эти переменные используются в тестах. Не редактируйте их.
  var formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {

    /** 13 - #isString утверждает, что фактическое значение является строкой. **/
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'число с точкой не строка');
      assert.isString(process.env.PATH, 'env vars - это строки(или неопределенные)');
      assert.isString(JSON.stringify({
        type: 'object'
      }), 'JSON - это строка');
    });

    /** 14 - #include (на #notInclude ) работает для струн тоже !! **/
    // Он утверждает, что фактическая строка содержит ожидаемую подстроку
    test('String #include, #notInclude', function () {
      assert.include('Arrow', 'row', "Стрелка содержит строку ...");
      assert.notInclude('dart', 'queue', "Но дротик не содержит очереди");
    });

    /** 15 - #match Утверждает, что фактическая стоимость **/
    // соответствует второму аргументу регулярного выражения.!!!
    test('#match, #notMatch', function () {
      var regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex);
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // ----------------------------------------------------------------------------- 

  // Эти переменные используются в тестах. Не редактируйте их.
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

    /** 16 - #property утверждает, что фактический объект имеет данное свойство. **/
    // При необходимости используйте #property или #notProperty
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', 'У машины нет крыльев');
      assert.property(airlinePlane, 'engines', 'самолеты имеют двигатели');
      assert.property(myCar, 'wheels', 'Автомобили имеют колеса');
    });

    test('#typeOf, #notTypeOf', function () {

      /** 17 #typeOf утверждает, что тип значения является заданной строкой, **/
      // как определено Object.prototype.toString.
      // использование #typeOf или же #notTypeOf где уместно
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.typeOf(airlinePlane.engines, 'array');
      assert.typeOf(myCar.wheels, 'number');
    });

    test('#instanceOf, #notInstanceOf', function () {

      /** 18 #instanceOf утверждает, что объект является экземпляром конструктора **/
      // использование #instanceOf или же #notInstanceOf где уместно
      assert.notInstanceOf(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object, 'все является объектом');
      assert.notInstanceOf(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});

/** 
 *  Хорошая работа, вы сделали здесь! 
 *  Пожалуйста, перейдите в файл "2_functional_tests.js" ... 
 **/