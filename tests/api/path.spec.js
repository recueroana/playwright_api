const { test, expect } = require('@playwright/test');

var tokenRecebido;

test('Atualização parcial', async ({ request }) => {
    const response = await request.post('/auth', {
        data: {
            "username" : "admin",
            "password" : "password123"
        }
    })
    //verificando a resposta da API
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    tokenRecebido = responseBody.token;

//Atualizando campos da reserva:
const partialUpdateRequest = await request.patch('/booking/5', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${tokenRecebido}`
    },
    data: {
        "firstname" : "Ana",
        "lastname" : "Carolina"
    }
})
console.log(await partialUpdateRequest.json());
expect(partialUpdateRequest.ok()).toBeTruthy();
expect(partialUpdateRequest.status()).toBe(200);

const partialUpdateResponseBody = await partialUpdateRequest.json();

expect(partialUpdateResponseBody).toHaveProperty("firstname", "Ana");
expect(partialUpdateResponseBody).toHaveProperty("lastname", "Carolina");
});