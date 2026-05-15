(async () => {
  try {
    const email = `test${Date.now()}@test.com`;
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email, password: 'password123' })
    });
    const user = await registerRes.json();
    const token = user.token;

    const prodRes = await fetch('http://localhost:5000/api/products');
    const product = (await prodRes.json()).products[0];

    await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId: product._id })
    });
    
    const getRes = await fetch(`http://localhost:5000/api/cart/${user.id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const getCart = await getRes.json();
    console.log(getCart.items[0].productId);
  } catch (error) {
    console.error('Error:', error);
  }
})();
