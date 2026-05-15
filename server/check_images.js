const https = require('https');

const imageUrls = [
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1533681473215-618fcad1719b?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=600&h=750&fit=crop'
];

async function checkUrls() {
  for (const url of imageUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok && res.status !== 405) {
        console.log('BROKEN:', url, res.status);
      }
    } catch (err) {
      console.log('ERROR:', url, err.message);
    }
  }
  console.log('Done.');
}
checkUrls();
