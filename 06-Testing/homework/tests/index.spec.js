const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with an object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').send({a:1, b:1}).expect(200));
    it('responds with an object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
    it('responds with the sum of 3 and 3', () =>
      agent.post('/sum')
        .send({a: 3, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').send({a:1, b:1}).expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
    it('responds with the product of 1 and 3', () =>
      agent.post('/product')
        .send({a: 1, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(3);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 400', ()=>agent.post('/sumArray').expect(400));
    it('responds with 200', () => agent.post('/sumArray').send({array: [], num:1}).expect(200));
    it('should respond with true if the combination of two numbers matches num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('should respond with false if no combination of two numbers mathes num', ()=>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 23})
        .then((res)=>{
        expect(res.body.result).toEqual(false)
      }));  
  });


describe('POST /numString', () => {
  it('responds with 400 if string is empty', ()=>agent.post('/numString').send({string : ''}).expect(400));
  it('responds with 400 if type of element is int', ()=>agent.post('/numString').send({string : 1}).expect(400));
  it('it should return 4 if receives `hola`string', () =>
    agent.post('/numString')
      .send({string: 'hola'})
      .then((res) => {
        expect(res.body.result).toEqual(4);
    }));
    it('it should return 2 if receives `hi`string', () =>
    agent.post('/numString')
      .send({string: 'hi'})
      .then((res) => {
        expect(res.body.result).toEqual(2);
    }));
  });

  describe('POST /pluck', () => {
    it('responds with 400  string is empty', () => agent.post('/pluck').send({array: [], string:''}).expect(400));
    it('responds with 400  array is not an array', () => agent.post('/pluck').send({array: 3, string:'hola'}).expect(400));
    it('responds with 200', () => agent.post('/pluck').send({array: [], string:'hola'}).expect(200));
    it('should return [`Sergio`, `Pedro`, `Jone`] when send string `nombre`', () =>
      agent.post('/pluck')
        .send({
          array: [{
              nombre : 'Sergio',
              edad : 31
            },
         {
            nombre : 'Pedro',
            edad : 26
        },
          {
            nombre : 'Jone',
            edad : 31
          }
        ],
         string: 'nombre'
        })
        .then((res) => {
          expect(res.body.result).toEqual(['Sergio', 'Pedro', 'Jone']);
      }));
      it('should return with [31, 26, 31] when send string `edad`', () =>
      agent.post('/pluck')
        .send({
          array: [{
              nombre : 'Sergio',
              edad : 31
            },
         {
            nombre : 'Pedro',
            edad : 26
        },
          {
            nombre : 'Jone',
            edad : 31
          }
        ],
         string: 'edad'
        })
        .then((res) => {
          expect(res.body.result).toEqual([31, 26, 31]);
      }));
  });
});
