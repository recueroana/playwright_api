const { test, expect } = require('@playwright/test');

var tokenRecebido;

test('Gerando um token', async ({ request }) => {
    const response = await request.post('/auth', {
        data: {
            "username" : "admin",
            "password" : "password123"
        }
    })
    console.log(await response.json());
    //verificando a resposta da API
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    tokenRecebido = responseBody.token;
    console.log("Seu token é:" + tokenRecebido)

});


