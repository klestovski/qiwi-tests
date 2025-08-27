import { test, expect } from '@playwright/test';

test.describe('QIWI API mock tests', () => {
  test('Сервис доступен', async ({ request }) => {
    const resp = await request.get('/payments');
    expect(resp.status()).toBe(200);
    expect(await resp.json()).toBeTruthy();
  });

  test('Баланс > 0', async ({ request }) => {
    const resp = await request.get('/funding-sources/v2/persons/12345/accounts');
    const data = await resp.json();
    expect(data.accounts[0].balance.amount).toBeGreaterThan(0);
  });

  test('Создание платежа на 1 рубль', async ({ request }) => {
    const resp = await request.post('/sinap/api/v2/terms/99/payments', {
      data: {
        id: "test-123",
        sum: { amount: 1, currency: "643" },
        paymentMethod: { type: "Account", accountId: "643" },
        fields: { account: "79990000000" }
      }
    });
    const data = await resp.json();
    expect(data.sum.amount).toBe(1);
  });

  test('Исполнение платежа', async ({ request }) => {
    const resp = await request.get('/payment/test-123/status');
    const data = await resp.json();
    expect(data.status).toBe("SUCCESS");
  });
});
