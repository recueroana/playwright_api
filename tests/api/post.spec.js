
const { test, expect } = require('@playwright/test');


test('Cadastrando uma reserva', async ({ request }) => {
    const response = await request.post('/booking', {
        data: {
            "firstname" : "Ana",
            "lastname" : "Carolina",
            "totalprice" : 249,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    });
console.log(await response.json());
//verificando a resposta da API
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

//Validando dados de retorno
const responseBody = await response.json();

expect(responseBody.booking).toHaveProperty("firstname", "Ana");
expect(responseBody.booking).toHaveProperty("lastname", "Carolina");
expect(responseBody.booking).toHaveProperty("totalprice", 249);
expect(responseBody.booking).toHaveProperty("depositpaid", true);
expect(responseBody.booking).toHaveProperty("bookingdates.checkin", "2018-01-01");
expect(responseBody.booking).toHaveProperty("bookingdates.checkout", "2019-01-01");
expect(responseBody.booking).toHaveProperty("additionalneeds","Breakfast" );
});
  
  