(async () => {
  try {
    const email = `test${Date.now()}@test.com`;
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email, password: 'password123' })
    });
    const token = (await registerRes.json()).token;

    const prodRes = await fetch('http://localhost:5000/api/products');
    const product = (await prodRes.json()).products[0];

    const cartRes = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId: product._id })
    });
    console.log(await cartRes.json());
  } catch (error) {
    console.error('Error:', error);
  }
})();
