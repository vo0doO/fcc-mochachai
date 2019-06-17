var chai = require('chai');
var assert = chai.assert;

var server = require('../server'); /** импортировать приложение Express **/

var chaiHttp = require('chai-http'); /** требуется плагин chai-http **/
chai.use(chaiHttp); /** используйте плагин chai-http **/


suite('Functional Tests', function () {

  // Мокко позволяет тестировать асинхронные операции.
  // Есть небольшая (БОЛЬШАЯ) разница. Можете ли вы найти это ?

  // ### ПРИМЕР ### 
  test('Asynchronous test #example', function (done) {
    /** <= Передайте обратный вызов в тестовую функцию **/
    setTimeout(function () {
      assert.isOk('Асинхронный тест !!');
      done(); /** Вызовите «done ()», когда асинхронная операция завершена**/
    }, 500); // функция будет выполнена через 500 мс
  });

  // NOTE: Тесты, имеющие #example в строке описания,
  // являются учебными примерами и не анализируются нашим тестовым анализатором

  suite('Integration tests with chai-http', function () {
    // Мы можем протестировать наши конечные точки API с помощью плагина под названием chai-http.
    // Посмотрим, как это работает. И помните, вызовы API являются асинхронными...

    // ### ПРИМЕР ### 
    suite('GET /hello?name=[name] => "hello [name]"', function () {
      // Мы отправляем строку имени в строке запроса URL.
      test('#example - ?name=John', function (done) { // Не забудьте перезвонить ...
        chai.request(server) // 'server' is the Express App
          .get('/hello?name=John') // http_method(url)
          .end(function (err, res) { // Отправьте запрос. Пройдите обратный звонок в
            // стиль node. `res` является объектом ответа
            // res.status содержит код состояния
            assert.equal(res.status, 200, 'статус ответа должен быть 200');
            // res.text содержит ответ в виде строки
            assert.equal(res.text, 'hello John', 'ответ должен быть "привет Джон"');
            done();
          });
      });

      /** Готов попробовать ?
       * Replace assert.fail(). Сделать тестовый проход. **/

      // Если имя не передано, конечная точка отвечает «Привет, Гость».
      test('Test GET /hello with no name', function (done) { // Не забудьте перезвонить ...
        chai.request(server) // 'server' это Express App
          .get('/hello') // http_method(url). НЕТ ИМЯ в запросе !
          .end(function (err, res) { // res - объект ответа

            // Проверьте статус и текстовый ответ (см. Пример выше). 
            // Пожалуйста, следуйте порядку -status, -text. Мы полагаемся на это в наших тестах.
            // Должен ответить «Привет, Гость»
            assert.equal(res.status, 200);
            assert.equal(res.text, 'hello Guest');
            done(); // Всегда вызывайте обратный вызов done () по окончании.
          });
      });

      /**  Другой... **/
      test('Test GET /hello with your name', function (done) { // Не забудьте перезвонить ...
        chai.request(server) // 'server' это Express App
          .get('/hello?name=Danila') /** <=== Введите свое имя в запросе **/
          .end(function (err, res) { // res - объект ответа

            // Ваши тесты здесь.
            // замещать assert.fail(). Сделать тестовый проход.
            // Проверьте статус и текстовый ответ. Следуйте порядку испытаний, как указано выше.
            assert.equal(res.status, 200);
            assert.equal(res.text, 'hello Danila' /** <==  Введите свое имя здесь **/ );
            done(); // Всегда звони 'done()' обратный вызов по окончании.
          });
      });

    });

    // В следующем примере мы увидим, как отправлять данные в полезной нагрузке запроса. (body).
    // Мы собираемся проверить запрос PUT. The '/travellers' конечная точка принимает
    // объект JSON, принимающий структуру :
    // {surname: [фамилия путешественника прошлого]} ,
    // Конечная точка отвечает :
    // {name: [имя], surname:[Фамилия], dates: [год рождение - год смерти]}
    // см. код сервера для более подробной информации.

    // ### ПРИМЕР ### 
    suite('PUT /travellers', function () {
      test('#пример - отвечает с соответствующими данными JSON при отправке {surname: "Polo"}', function (done) {
        chai.request(server)
          .put('/travellers') // обратите внимание на метод PUT
          .send({
            surname: 'Polo'
          }) // прикрепить полезную нагрузку, закодированную как JSON
          .end(function (err, res) { // Отправьте запрос. Передайте обратный вызов узла

            assert.equal(res.status, 200, 'статус ответа должен быть 200');
            assert.equal(res.type, 'application/json', "Ответ должен быть JSON");

            // res.body содержит ответ, проанализированный как объект JS, когда это уместно
            // (i.e тип ответа JSON)
            assert.equal(res.body.name, 'Marco', 'res.body.name должно быть "Marco"');
            assert.equal(res.body.surname, 'Polo', 'res.body.surname должно быть "Polo"');

            // вызов 'done()' когда ... сделано
            done();
          });
      });

      /** Теперь твоя очередь. Сделать тестовый проход. **/
      // Мы ожидаем, что ответ будет
      // {name: 'Cristoforo', surname: 'Colombo', dates: '1451 - 1506'}
      // проверить статус, тип, имя и фамилию.

      // !!!! Следуйте порядку утверждений в предыдущем примере!!!!, 
      // мы полагаемся на это в наших тестах.

      test('send {surname: "Colombo"}', function (done) {

        // мы настроим запрос для вас ... !
        chai.request(server)
          .put('/travellers')
          /** Отправить {surname: 'Colombo'} Вот **/
          .send({
            surname: "Colombo"
          })
          .end(function (err, res) {
            /** ваши тесты здесь **/
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.name, 'Cristoforo');
            assert.equal(res.body.surname, 'Colombo');
            done(); //Никогда не забывайте !!! 'done()' Перезвоните...
          });
      });

      /** Повторение - мать учения. **/
      // Попробуйте снова. На этот раз без посторонней помощи !!

      test('send {surname: "da Verrazzano"}', function (done) {
        /** разместите код запроса chai-http здесь ... **/
        chai.request(server)
          .put('/travellers')
          .send({
            surname: "Verrazzano"
          })
          .end(function (err, res) {
            /** поместите свои тесты внутри обратного вызова **/
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.name, 'Giovanni');
            assert.equal(res.body.surname, 'da Verrazzano');
            done();
          })
      });
    });
  });

  // В следующих задачах мы будем моделировать взаимодействие человека с
  // страница, использующая устройство под названием «Безголовый браузер». Безголовый браузер - это веб
  // браузер без графического интерфейса пользователя. Эти инструменты
  // особенно полезно для тестирования веб-страниц, поскольку они могут отображать
  // и понимаем HTML, CSS и JavaScript так же, как браузер.

  // Для этих задач мы используем [Zombie.Js](http://zombie.js.org/)
  // Это легкий браузер, который полностью основан на JS, не полагаясь на
  // дополнительные двоичные файлы для установки. Эта функция делает его пригодным для использования в
  // среда, такая как Gomix. Есть много других (более мощных) вариантов.

  var Browser = require('zombie');

  // On Gomix we'll use this setting
  /** ### Copy your project's url here  ### **/
  Browser.site = 'http://ubuntu.asuscomm.com:3000/';

  // If you are testing on a local environment replace the line above  with 
  // Browser.localhost('example.com', (process.env.PORT || 3000));

  suite('e2e Testing with Zombie.js', function () {
    const browser = new Browser();

    // Мокко позволяет подготовить почву, запустив некоторый код
    // до реальных испытаний. Это может быть полезно, например, для создания
    // элементы в базе данных, которые будут использоваться в последующих тестах.

    // С безголовым браузером, перед фактическим тестированием нам нужно
    // ** посетите ** страницу, которую мы собираемся проверить ...
    // пакет 'hook' suiteSetup выполняется только один раз при запуске пакета.
    // Другие различные типы хуков могут выполняться перед каждым тестом, после
    // каждый тест или в конце комплекта. Смотрите документы Mocha для получения дополнительной информации.

    suiteSetup(function (done) { // Помните, что веб-взаимодействия асинхронны !!
      return browser.visit('/', done); // Браузерные асинхронные операции принимают обратный вызов
    });

    suite('"Famous Italian Explorers" form', function () {

      // В основном представлении HTML мы предоставили форму ввода.
      // Он отправляет данные в конечную точку «PUT / travelers», которую мы использовали выше
      // с помощью Ajax-запроса. После успешного завершения запроса
      // клиентский код добавляет <div>, содержащий информацию, возвращаемую при вызове
      // в ДОМ. 

      /** 
       * Для начала, попробуйте ввести форму вручную!
       * отправить имя «Поло»! Вы получите информацию о знаменитом
       * исследователь 'Марко Поло'
       **/ // (не требуется проходить тесты)

      // Сделал это ? Хорошо. Посмотрим, как автоматизировать процесс ...

      // ### EXAMPLE ###
      test('#example - submit the input "surname" : "Polo"', function (done) {

        browser
          .fill('surname', 'Polo')
        browser.pressButton('submit', setTimeout(function () {
          // pressButton is ## Async ##.  
          // It waits for the ajax call to complete...!
          // assert that status is OK 200
          browser.assert.success();
          // assert that the text inside the element 'span#name' is 'Marco'
          browser.assert.text('span#name', 'Marco');
          // assert that the text inside the element 'span#surname' is 'Polo'
          browser.assert.text('span#surname', 'Polo');
          // assert that the element(s) 'span#dates' exist and their count is 1
          browser.assert.element('span#date', 1);
          done(); /** Вызовите «done ()», когда асинхронная операция завершена**/
        }, 600))
      })

    })


    /** Now it's your turn. Please don't use the keyword #example in the title. **/

    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      setTimeout(function () {
        // fill the form...
        // then submit it pressing 'submit' button.
        //
        // in the callback...
        // assert that status is OK 200
        // assert that the text inside the element 'span#name' is 'Cristoforo'
        // assert that the text inside the element 'span#surname' is 'Colombo'
        // assert that the element(s) 'span#dates' exist and their count is 1
        browser
          .fill('surname', 'Colombo')
          .pressButton('submit', function () {

            /** YOUR TESTS HERE, Don't forget to remove assert.fail() **/

            // pressButton is Async.  Waits for the ajax call to complete...

            // assert that status is OK 200

            // assert that the text inside the element 'span#name' is 'Cristoforo'

            // assert that the text inside the element 'span#surname' is 'Colombo'

            // assert that the element(s) 'span#dates' exist and their count is 1


            done(); // It's an async test, so we have to call 'done()''
          });
      }, 600)
      // 
    })


    /** Try it again... No help this time **/
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      setTimeout(function () {
        assert.isOk("ASYNC TEST !")
        // fill the form, and submit.
        // assert that status is OK 200
        // assert that the text inside the element 'span#name' is 'Amerigo'
        // assert that the text inside the element 'span#surname' is 'Vespucci'
        // assert that the element(s) 'span#dates' exist and their count is 1
        done();
      }, 600)
    })
  })
})