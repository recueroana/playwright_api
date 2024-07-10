// @ts-check
const { test, expect } = require('@playwright/test');


test('Consultando as reservas cadastradas', async ({ request }) => {
  const response = await request.get('/booking');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando as reservas cadastradas baseada em um id por campo e valor', async ({ request }) => {
  const response = await request.get('/booking/59');
  const responseBody = await response.json();
//Verificando se os dados da reserva do id batem
  expect(responseBody.firstname).toBe('Jane');
  expect(responseBody.lastname).toBe('Doe');
  expect(responseBody.totalprice).toBe(111);
  expect(responseBody.depositpaid).toBeTruthy();
  expect(responseBody.bookingdates.checkin).toBe('2018-01-01');
  expect(responseBody.bookingdates.checkout).toBe('2019-01-01');
  expect(responseBody.additionalneeds).toBe('Extra pillows please');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

test('Consultando as reservas cadastradas baseada em um id por campo sem o valor', async ({ request }) => {
  const response = await request.get('/booking/69');
  const responseBody = await response.json();
//Verificando se os campos da reserva batem
  expect(responseBody).toHaveProperty('firstname');
  expect(responseBody).toHaveProperty('lastname');
  expect(responseBody).toHaveProperty('totalprice');
  expect(responseBody).toHaveProperty('depositpaid');
  expect(responseBody).toHaveProperty('bookingdates');
  expect(responseBody).toHaveProperty('additionalneeds');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

