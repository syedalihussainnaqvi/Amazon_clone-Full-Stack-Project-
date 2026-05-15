const Product = require('../models/Product');
const ChatHistory = require('../models/ChatHistory');
const UserPreferences = require('../models/UserPreferences');

// ─────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────

const sanitize = (str) =>
  String(str || '')
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s,.!?'"\-@]/gi, '')
    .trim()
    .slice(0, 500);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────
// Intent Detection Engine
// ─────────────────────────────────────────────

const INTENTS = {
  GREETING:        /\b(hi|hello|hey|good morning|good afternoon|good evening|whats up|what's up|sup|howdy)\b/i,
  ABOUT:           /\b(about|who are you|what is this|what do you sell|what is syed|tell me about)\b/i,
  ACCOUNT:         /\b(account|profile|my account|dashboard|login|sign in|register|create account|forgot password|order status|my orders)\b/i,
  WEBSITE:         /\b(website|web site|site|home page|landing page|navigate the site|how do i use the site|where can i find|how do i find|get to know the site|help page|help section|site navigation)\b/i,
  CONTACT:         /\b(contact|customer service|support|help desk|email|phone number|call you)\b/i,
  HELP:            /\b(help|help me|assist|assistance|question|faq|how do i|how can i|where can i)\b/i,
  PRIVACY:         /\b(privacy|data privacy|privacy policy|personal information|privacy notice)\b/i,
  TERMS:           /\b(terms|conditions of use|terms of service|terms and conditions)\b/i,
  TRACKING:        /\b(track|tracking|where is my order|order status|shipment status|delivery status)\b/i,
  RETURN:          /\b(return|refund|exchange|send back|money back|policy|return policy)\b/i,
  PAYMENT:         /\b(pay|payment|method|card|visa|mastercard|paypal|checkout|cash)\b/i,
  TRENDING:        /\b(trend|trending|popular|hot|new arrival|latest|what's new|best seller|most loved)\b/i,
  RECOMMEND:       /\b(recommend|suggest|help me|what should|choose|pick|find|looking for|need something|help choose)\b/i,
  CASUAL_WEAR:     /\b(casual|everyday|relaxed|chill|weekend|streetwear|street style|laid.?back)\b/i,
  FORMAL_WEAR:     /\b(formal|office|work|business|professional|smart|suit|meeting|interview)\b/i,
  WINTER_WEAR:     /\b(winter|cold|warm|layer|coat|jacket|outerwear|hoodie|sweater|thick)\b/i,
  ACTIVEWEAR:      /\b(gym|sport|active|workout|exercise|fitness|running|training|athletic|performance)\b/i,
  SHIRTS:          /\b(shirt|shirts|dress shirt|button.?up|oxford|formal shirt)\b/i,
  TSHIRTS:         /\b(t.?shirt|tee|graphic tee|plain tee|polo)\b/i,
  PANTS:           /\b(pant|trouser|chino|jogger|denim|jeans|shorts|bottom)\b/i,
  SHOES:           /\b(shoe|sneaker|boot|loafer|footwear|kicks)\b/i,
  ACCESSORIES:     /\b(accessory|accessories|watch|belt|wallet|bag|cap|hat|tie|scarf)\b/i,
  OUTFIT:          /\b(outfit|look|style|combination|match|pair|put together|full look|complete)\b/i,
  UNIVERSITY:      /\b(university|college|campus|school|student|class|lecture)\b/i,
  SIZE_GUIDE:      /\b(size|sizing|fit|measure|chart|small|medium|large|xl)\b/i,
  DISCOUNT:        /\b(discount|sale|offer|deal|promo|coupon|voucher|cheap|afford)\b/i,
  GIFT:            /\b(gift|present|someone|birthday|occasion|surprise|for him|for them)\b/i,
  SEARCH:          /\b(show|find|search|browse|display|see|view|list|get)\b/i,
};

const PRIORITY_INTENTS = [
  'PRIVACY', 'TERMS', 'TRACKING', 'ACCOUNT', 'SHIPPING', 'RETURN', 'PAYMENT', 'CONTACT', 'ABOUT',
  'WEBSITE', 'HELP', 'TRENDING', 'RECOMMEND', 'OUTFIT', 'FORMAL_WEAR', 'CASUAL_WEAR', 'UNIVERSITY',
  'GIFT', 'SIZE_GUIDE', 'DISCOUNT', 'SHIRTS', 'TSHIRTS', 'PANTS', 'SHOES', 'ACCESSORIES', 'ACTIVEWEAR', 'WINTER_WEAR', 'SEARCH', 'GREETING', 'FAREWELL'
];

const detectIntent = (message) => {
  const lower = message.toLowerCase();
  for (const intent of PRIORITY_INTENTS) {
    if (INTENTS[intent] && INTENTS[intent].test(lower)) {
      return intent;
    }
  }
  return 'GENERAL';
};

const detectCategory = (message) => {
  if (/shirt/i.test(message)) return 'Shirts';
  if (/t.?shirt|tee/i.test(message)) return 'T-Shirts';
  if (/pant|trouser|chino|jeans/i.test(message)) return 'Pants';
  if (/shoe|sneaker|boot/i.test(message)) return 'Shoes';
  if (/accessor/i.test(message)) return 'Accessories';
  if (/active|gym|sport/i.test(message)) return 'Activewear';
  if (/jacket|coat|outerwear|winter/i.test(message)) return 'Outerwear';
  return null;
};

// ─────────────────────────────────────────────
// Product Fetcher – always returns conversational descriptions
// ─────────────────────────────────────────────

const fetchProducts = async (filter = {}, limit = 3) => {
  try {
    const query = {};
    if (filter.category) query.category = filter.category;
    if (filter.trending) query.trending = true;
    if (filter.featured) query.featured = true;

    const products = await Product.find(query).limit(limit).select(
      'title category description image trending featured averageRating'
    );
    return products;
  } catch {
    return [];
  }
};

// ─────────────────────────────────────────────
// Conversational Response Builder
// ─────────────────────────────────────────────

const styleDescriptions = {
  Shirts:      ['a sharp, versatile formal piece', 'a clean and polished wardrobe essential', 'a sophisticated statement shirt'],
  'T-Shirts':  ['a relaxed everyday essential', 'a premium casual staple', 'a modern streetwear favourite'],
  Pants:       ['a sleek everyday bottom', 'an extremely versatile pair', 'a contemporary must-have for any wardrobe'],
  Shoes:       ['an iconic pair that elevates any look', 'a comfortable everyday shoe', 'a clean and minimal design everyone loves'],
  Accessories: ['a subtle accent piece', 'an easy way to upgrade any outfit', 'a finishing touch for a polished look'],
  Activewear:  ['a high-performance piece built for the gym', 'a breathable active essential', 'your go-to for workout sessions'],
  Outerwear:   ['a clean winter layering piece', 'a statement outer layer', 'the perfect cold-weather companion'],
};

const formatProductCard = (product) => {
  const category = product.category || 'General';
  const styles = styleDescriptions[category] || ['a great wardrobe addition'];
  const styleDesc = styles[Math.floor(Math.random() * styles.length)];
  const trend = product.trending ? " It's currently trending with our customers." : '';
  const rating = product.averageRating > 0
    ? ` Highly rated by our community.`
    : '';
  return {
    id: product._id,
    title: product.title,
    category: product.category,
    image: product.image,
    styleDescription: `${styleDesc}.${trend}${rating}`,
    conversationalSummary: `**${product.title}** — ${styleDesc}.${trend}${rating}`,
  };
};

// ─────────────────────────────────────────────
// Response Templates
// ─────────────────────────────────────────────

const getGreeting = (turn) => {
  if (turn === 0) {
    return `Hey there! 👋 Welcome to **SYED** — your style destination for modern men's fashion. I'm SYED, your personal style assistant.\n\nAre you looking for something specific today, or would you like me to show you what's trending? 🔥`;
  }
  return `Hey again! 😊 Great to have you back. What can I help you find today?`;
};

const greetingResponse = () => ({
  text: `Hey there! 👋 Welcome to **SYED**. I'm your personal style concierge — here to help you find the perfect look.\n\nAre you shopping for a specific occasion, or would you like me to recommend what's trending right now? 🔥`,
  suggestions: ['Show trending styles', 'Casual outfit ideas', 'Smart formal looks', 'Something for the gym'],
  products: [],
});

const farewellResponse = () => ({
  text: `It was great helping you today! 😊 Come back anytime you need style advice. Remember — looking great starts with the right outfit. See you soon! 👋`,
  suggestions: ['Show trending styles', 'Browse new arrivals'],
  products: [],
});

const aboutResponse = () => ({
  text: `**SYED** is a premium modern e-commerce platform dedicated to men's fashion.\n\nWe specialize in high-quality, versatile clothing that fits every occasion — from sharp formal wear for the office, to clean and relaxed streetwear. My job as your AI assistant is to help you navigate our collections, find the perfect fit, and answer any questions you have!\n\nWould you like to see what's trending right now?`,
  suggestions: ['Show trending styles', 'Shop casual wear', 'Shop formal wear'],
  products: [],
});

const accountResponse = () => ({
  text: `Need help with your account or orders? Here's what to do:\n\n- Use **Your Account** to manage your profile, payments, and saved addresses.\n- Visit **Your Orders** to track shipments, see order status, or start a return.\n- If you need to log in or register, use the **Login** / **Register** links in the header.\n\nI can also help you locate a specific page like Help, Returns, Shipping, or Products.`,
  suggestions: ['Order status', 'Returns info', 'Shipping info'],
  products: [],
});

const helpResponse = () => ({
  text: `I'm here to help! You can ask me about:

- Finding products by category or style
- Tracking an order or managing your account
- Shipping, returns, payments, and site navigation
- Where to find help and support pages

Tell me exactly what you need, and I'll point you to the best answer.`,
  suggestions: ['Where is my order', 'How do I return', 'Shipping info', 'Product categories'],
  products: [],
});

const websiteResponse = () => ({
  text: `You can explore our full site using the main navigation and category pages:

- Browse **Products** to see shirts, pants, shoes, and accessories.
- Open **Your Account** to check orders, track shipping, or manage returns.
- Visit **Help** for details on shipping, payment, and returns.

If you'd like, I can also show you trending styles, recommend something, or help find a specific item on the site.`,
  suggestions: ['Show trending styles', 'Help me choose', 'Shipping info'],
  products: [],
});

const contactResponse = () => ({
  text: `Need to speak with a human? Our customer support team is always ready to help! 📞\n\n✉️ **Email:** support@syed.com\n📞 **Phone:** +1 (800) 555-0199\n⏰ **Hours:** Mon-Fri, 9am - 6pm EST\n\nYou can also visit our Contact Page for more details. Is there anything I can help resolve for you directly here?`,
  suggestions: ['Order status', 'Return policy', 'Shipping info'],
  products: [],
});

const deliveryResponse = () => ({
  text: `Great question! Here's how our delivery works:\n\n📦 **Standard Delivery** — 5–7 business days\n⚡ **Expedited Delivery** — 2–3 business days\n🚚 **Free Shipping** on all orders over $100\n\nOnce your order ships, you'll receive a tracking link by email. You can also track real-time from your account dashboard. Is there anything else I can help you with?`,
  suggestions: ['Return policy', 'Payment methods', 'Show trending items'],
  products: [],
});

const returnResponse = () => ({
  text: `We want you to love what you wear! Here's our return policy:\n\n↩️ **30-day return window** from delivery\n👕 Items must be **unworn & unwashed** with tags attached\n📧 Initiate returns from **Your Orders** page — it's quick and easy\n💳 **Refunds processed** within 3–5 business days\n\nAny other questions I can answer for you?`,
  suggestions: ['Shipping info', 'Payment methods', 'Show new arrivals'],
  products: [],
});

const paymentResponse = () => ({
  text: `We keep checkout simple and secure! 💳 We accept:\n\n✅ Visa & Mastercard\n✅ American Express\n✅ Discover\n✅ PayPal\n🔒 All transactions are **SSL encrypted** — your card data is always protected.\n\nIs there anything else I can help with?`,
  suggestions: ['Shipping info', 'Return policy', 'Trending outfits'],
  products: [],
});

const orderResponse = () => ({
  text: `For order-related help:\n\n🔄 **Cancel/modify** — within 1 hour of placing the order via Your Orders page\n📦 **Track your order** — live tracking link sent to your email once shipped\n📋 **Order history** — available in your account dashboard anytime\n\nIs there anything else I can help you with?`,
  suggestions: ['Shipping times', 'Return policy', 'Shop new arrivals'],
  products: [],
});

const sizeGuideResponse = () => ({
  text: `Getting the right fit is everything! 👌 Here's a quick guide:\n\n**S** → Chest 36–38" | Waist 29–31"\n**M** → Chest 38–40" | Waist 31–33"\n**L** → Chest 40–42" | Waist 33–35"\n**XL** → Chest 42–44" | Waist 35–37"\n\n💡 **Tip:** If you're between sizes, we generally recommend sizing up for a more relaxed fit. Most of our shirts and tees are true to size.\n\nWant me to recommend something in a specific size range?`,
  suggestions: ['Show T-Shirts', 'Casual shirts', 'Slim fit options'],
  products: [],
});

const discountResponse = () => ({
  text: `Everyone loves a good deal! 🎉 Here's how you save at SYED:\n\n🚚 **Free shipping** on orders over $100\n🔖 **Sale section** — updated weekly with discounted items\n📧 **Newsletter subscribers** get exclusive early-bird offers\n🎁 **Gift cards** available for loved ones\n\nWould you like me to show you some of our most popular value picks?`,
  suggestions: ['Show trending items', 'Casual wear', 'Accessories'],
  products: [],
});

const giftResponse = () => ({
  text: `Shopping for someone special? 🎁 Great choice — a well-chosen outfit always impresses!\n\nFor a gift, I'd suggest thinking about:\n- Their everyday style (casual vs. formal?)\n- Their favourite colours (safe bets: black, navy, white)\n- Accessories — always a hit with any wardrobe\n\nShall I put together a gift-worthy selection for you?`,
  suggestions: ['Trending accessories', 'Smart casual shirts', 'Premium T-Shirts'],
  products: [],
});

const outfitCombinationResponse = () => ({
  text: `Great taste! 🙌 A complete outfit from SYED is always more than the sum of its parts. Here's a classic combination that never fails:\n\n**Smart Casual:** Slim-fit shirt + tapered chinos + clean sneakers\n**Street Style:** Graphic tee + jogger pants + minimal sneakers\n**Smart Formal:** Oxford shirt + dress trousers + leather shoes\n\nWant me to pull up some specific pieces for any of these looks?`,
  suggestions: ['Smart casual outfit', 'Streetwear look', 'Formal ensemble'],
  products: [],
});

const universityResponse = () => ({
  text: `Campus style should be effortless but polished! 🎓 Here's what works great for university:\n\n✅ **Relaxed T-Shirts** — comfortable for long lecture days\n✅ **Slim chinos** — smarter than jeans, just as comfy\n✅ **Clean sneakers** — go with everything\n✅ **A light jacket** — perfect for changing campus weather\n\nWant me to show you some popular campus-ready picks?`,
  suggestions: ['Show T-Shirts', 'Casual trousers', 'Light jackets'],
  products: [],
});

const generalResponse = (message) => ({
  text: `That's an interesting one! 🤔 I want to make sure I give you the best advice. Could you tell me a bit more about what you're looking for?\n\nFor example:\n- Are you dressing for a **specific occasion**? (work, university, gym, casual)\n- Do you prefer a **particular style**? (minimal, bold, streetwear, formal)\n- Is there a **specific item** you have in mind?\n\nI'm here to help you find your perfect look! 👔`,
  suggestions: ['Show trending items', 'Casual wear', 'Formal wear', 'Help me choose'],
  products: [],
});

// ─────────────────────────────────────────────
// Main Intent Router
// ─────────────────────────────────────────────

const buildResponse = async (message, intent, context) => {
  // Stateless intents (no DB needed)
  switch (intent) {
    case 'GREETING':  return greetingResponse();
    case 'ABOUT':     return aboutResponse();
    case 'ACCOUNT':   return accountResponse();
    case 'WEBSITE':   return websiteResponse();
    case 'HELP':      return helpResponse();
    case 'CONTACT':   return contactResponse();
    case 'FAREWELL':  return farewellResponse();
    case 'DELIVERY':  return deliveryResponse();
    case 'RETURN':    return returnResponse();
    case 'PAYMENT':   return paymentResponse();
    case 'ORDER':     return orderResponse();
    case 'SIZE_GUIDE':return sizeGuideResponse();
    case 'DISCOUNT':  return discountResponse();
    case 'GIFT':      return giftResponse();
    case 'OUTFIT':    return outfitCombinationResponse();
    case 'UNIVERSITY':return universityResponse();
  }

  // Product-based intents
  let filter = {};
  let introText = '';
  let suggestions = ['Show trending styles', 'Casual wear', 'Formal looks'];

  if (intent === 'TRENDING') {
    filter = { trending: true };
    introText = `🔥 Here are some of our hottest trending pieces right now — these are flying off the shelves:`;
    suggestions = ['Casual outfit ideas', 'Formal looks', 'Activewear'];
  } else if (intent === 'WINTER_WEAR') {
    filter = { category: 'Outerwear' };
    introText = `🧥 Perfect for the colder months! Here are some of our most loved layering and outerwear picks:`;
    suggestions = ['Smart casual', 'Accessories', 'Show all outerwear'];
  } else if (intent === 'ACTIVEWEAR') {
    filter = { category: 'Activewear' };
    introText = `💪 Ready to train in style? Here are some of our top performance pieces:`;
    suggestions = ['Show shoes', 'Casual wear', 'Trending items'];
  } else if (intent === 'SHIRTS') {
    filter = { category: 'Shirts' };
    introText = `👔 Great choice! Shirts are a wardrobe cornerstone. Here are some of our most popular styles:`;
    suggestions = ['Formal trousers', 'Smart shoes', 'Accessories'];
  } else if (intent === 'TSHIRTS') {
    filter = { category: 'T-Shirts' };
    introText = `👕 Can't go wrong with a great tee! Here are our most popular T-Shirts:`;
    suggestions = ['Casual trousers', 'Sneakers', 'Accessories'];
  } else if (intent === 'PANTS') {
    filter = { category: 'Pants' };
    introText = `👖 The right pair of trousers can transform a look. Here are some of our best-selling bottoms:`;
    suggestions = ['Formal shirts', 'Casual shirts', 'Shoes'];
  } else if (intent === 'SHOES') {
    filter = { category: 'Shoes' };
    introText = `👟 The finishing touch to any outfit! Here are some of our most loved shoes:`;
    suggestions = ['Casual outfits', 'Formal looks', 'Accessories'];
  } else if (intent === 'ACCESSORIES') {
    filter = { category: 'Accessories' };
    introText = `⌚ Details make the outfit. Here are some accessories that always get compliments:`;
    suggestions = ['Formal shirts', 'Smart casual', 'Trending items'];
  } else if (intent === 'CASUAL_WEAR') {
    // Mix of casual categories
    const cats = ['T-Shirts', 'Pants'];
    const cat = cats[Math.floor(Math.random() * cats.length)];
    filter = { category: cat };
    introText = `😎 Looking for something relaxed? Here are some of our most popular casual picks:`;
    suggestions = ['Streetwear looks', 'Casual shoes', 'Accessories'];
  } else if (intent === 'FORMAL_WEAR') {
    filter = { category: 'Shirts' };
    introText = `🏢 Dressing for success! Here are some of our sharpest formal pieces:`;
    suggestions = ['Formal trousers', 'Smart shoes', 'Accessories'];
  } else if (intent === 'RECOMMEND' || intent === 'SEARCH') {
    // Use context to inform the recommendation
    const cat = detectCategory(message) || (context?.preferredCategories?.[0]) || null;
    if (cat) {
      filter = { category: cat };
      introText = `✨ Based on what you're looking for, here are some pieces I think you'll love:`;
    } else {
      filter = { featured: true };
      introText = `✨ Here are some of our editor's picks — curated styles that are versatile and always in fashion:`;
    }
    suggestions = ['Show trending', 'Casual wear', 'Formal looks', 'Help me choose'];
  } else {
    return generalResponse(message);
  }

  const rawProducts = await fetchProducts(filter, 3);
  const products = rawProducts.map(formatProductCard);

  if (products.length === 0) {
    return {
      text: `${introText}\n\nOur collection is constantly being updated — check back soon, or let me suggest something from a different category!`,
      suggestions,
      products: [],
    };
  }

  return {
    text: introText,
    suggestions,
    products,
  };
};

// ─────────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────────

exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'message and sessionId are required.' });
    }

    const cleanMessage = sanitize(message);
    if (!cleanMessage) {
      return res.status(400).json({ error: 'Invalid message content.' });
    }

    // Load or create session
    let session = await ChatHistory.findOne({ sessionId });
    if (!session) {
      session = new ChatHistory({
        sessionId,
        userId: userId || null,
        messages: [],
        context: { conversationTurn: 0, preferredCategories: [] },
      });
    }

    // Detect intent
    const intent = detectIntent(cleanMessage);
    const category = detectCategory(cleanMessage);

    // Update context
    if (category && !session.context.preferredCategories.includes(category)) {
      session.context.preferredCategories.unshift(category);
      if (session.context.preferredCategories.length > 5) {
        session.context.preferredCategories.pop();
      }
    }
    session.context.lastIntent = intent;
    session.context.conversationTurn += 1;

    // Save user message
    session.messages.push({ role: 'user', content: cleanMessage });

    // Build response (simulated latency on server side)
    const { text, suggestions, products } = await buildResponse(
      cleanMessage,
      intent,
      session.context
    );

    // Save assistant message
    session.messages.push({
      role: 'assistant',
      content: text,
      metadata: {
        intent,
        products: products.map((p) => p.id),
      },
    });

    // Keep history manageable (last 50 messages)
    if (session.messages.length > 50) {
      session.messages = session.messages.slice(-50);
    }

    await session.save();

    // Update user preferences if logged in
    if (userId) {
      try {
        await UserPreferences.findOneAndUpdate(
          { userId },
          {
            $push: { interactionHistory: { $each: [{ intent }], $slice: -100 } },
            $addToSet: category ? { recentCategories: category } : {},
          },
          { upsert: true, new: true }
        );
      } catch (_) { /* non-critical */ }
    }

    return res.json({
      reply: text,
      suggestions,
      products,
      intent,
      sessionId,
    });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({
      error: 'Something went wrong. Please try again.',
      reply: "I'm having a moment — please try again shortly! 🙏",
      suggestions: ['Show trending styles', 'Help me find something'],
      products: [],
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/chat/recommendations
// ─────────────────────────────────────────────

exports.getRecommendations = async (req, res) => {
  try {
    const { category, limit = 4 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    else filter.trending = true;

    const rawProducts = await fetchProducts(filter, parseInt(limit));
    const products = rawProducts.map(formatProductCard);
    return res.json({ products });
  } catch (err) {
    console.error('Recommendations error:', err);
    return res.status(500).json({ products: [] });
  }
};

// ─────────────────────────────────────────────
// POST /api/chat/context
// ─────────────────────────────────────────────

exports.updateContext = async (req, res) => {
  try {
    const { sessionId, userId, preferences } = req.body;
    if (!sessionId && !userId) {
      return res.status(400).json({ error: 'sessionId or userId required.' });
    }
    if (sessionId) {
      await ChatHistory.findOneAndUpdate(
        { sessionId },
        { $set: { 'context.preferredCategories': preferences?.categories || [] } }
      );
    }
    if (userId && preferences) {
      await UserPreferences.findOneAndUpdate(
        { userId },
        { $set: { favoriteStyles: preferences.styles || [], recentCategories: preferences.categories || [] } },
        { upsert: true }
      );
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Context update failed.' });
  }
};
