(async () => {
  try {
    // 1. Register a user
    const email = `test${Date.now()}@test.com`;
    console.log('Registering user:', email);
    const registerRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email,
        password: 'password123'
      })
    });
    const registerData = await registerRes.json();
    if (!registerRes.ok) throw new Error(JSON.stringify(registerData));
    const token = registerData.token;
    console.log('Token:', token);

    // 2. Get a product
    const prodRes = await fetch('http://localhost:5000/api/products');
    const prodData = await prodRes.json();
    if (!prodRes.ok) throw new Error(JSON.stringify(prodData));
    const product = prodData.products[0];
    console.log('Found product:', product._id, product.title);

    // 3. Add to cart
    console.log('Adding to cart...');
    const cartRes = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
        size: 'M',
        color: 'Black'
      })
    });

    const cartData = await cartRes.json();
    if (!cartRes.ok) throw new Error(JSON.stringify(cartData));
    
    console.log('Success!', cartData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
