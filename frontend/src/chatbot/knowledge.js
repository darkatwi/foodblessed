/*
  ╔══════════════════════════════════════════════════════════════════╗
  ║           FOODBLESSED CHATBOT — KNOWLEDGE BASE                  ║
  ║                                                                  ║
  ║  This is your "prompt file". Edit it freely to teach the bot    ║
  ║  new facts, programs, team members, events, or FAQ answers.     ║
  ║                                                                  ║
  ║  Each entry has:                                                 ║
  ║    triggers  — words/phrases that activate this answer          ║
  ║    answer    — what the bot replies (use \n for line breaks)    ║
  ║    priority  — (optional) higher = wins ties (default: 1)       ║
  ╚══════════════════════════════════════════════════════════════════╝
*/

export const KNOWLEDGE = [

  // ── GREETINGS ───────────────────────────────────────────────────
  {
    triggers: ["hi", "hello", "hey", "salam", "good morning", "good afternoon", "howdy", "sup"],
    answer: "Hello! 👋 I'm the FoodBlessed assistant. Ask me anything about our mission, how to volunteer, donate, our programs, or how we fight hunger in Lebanon!",
  },
  {
    triggers: ["bye", "goodbye", "see you", "take care", "ciao", "later"],
    answer: "Goodbye! Thanks for your interest in FoodBlessed. Together we can feed the hungry, one meal at a time. 🍽️💚",
  },
  {
    triggers: ["thank you", "thanks", "shukran", "merci", "appreciate", "great", "awesome", "amazing", "perfect"],
    answer: "You're so welcome! 💚 Remember — every action, big or small, helps put a meal on someone's table. If you have more questions, I'm here anytime!",
  },

  // ── WHAT IS FOODBLESSED ─────────────────────────────────────────
  {
    triggers: ["what is foodblessed", "who are you", "what do you do", "tell me about foodblessed", "explain foodblessed", "overview", "what is this ngo", "foodblessed initiative", "describe foodblessed"],
    answer: "FoodBlessed is a community-based, volunteer-driven food rescue initiative fighting hunger and food waste in Lebanon. Founded in 2012, we rescue surplus food from restaurants, caterers, supermarkets and events — then transform it into free, warm meals for families, the elderly and refugees. We're powered entirely by everyday Hunger Heroes (volunteers)! 🥕",
  },

  // ── MISSION / VISION / VALUES ────────────────────────────────────
  {
    triggers: ["mission", "vision", "goal", "purpose", "cause", "objective", "values", "why exist", "why do you"],
    answer: "Our mission is to fight hunger and food waste in Lebanon simultaneously. We believe food is a human right — not a privilege. We rescue perfectly edible surplus food, cook it with love, and serve it free to those who need it most, while promoting Individual and Corporate Social Responsibility. 🌱\n\nFour causes drive everything we do:\n🍽️ Right to food\n🤲 Tackle hunger\n🌱 Promote food security\n♻️ Reduce food waste",
  },

  // ── FOUNDER & HISTORY ───────────────────────────────────────────
  {
    triggers: ["founder", "founded", "started", "maya terro", "maya", "terro", "history", "story", "origin", "co-founded", "when was foodblessed"],
    priority: 2,
    answer: "FoodBlessed was co-founded in 2012 by Maya Terro, a food activist troubled by the paradox of people going hungry while so much food is wasted. In 2013, FoodBlessed won the prestigious 'CSR in Action — Best Social Project' award. 🏆\n\nTo this day, it remains the only entity in Lebanon and the region tackling food poverty through food rescue and waste reduction.",
  },

  // ── IMPACT STATS ────────────────────────────────────────────────
  {
    triggers: ["how many meals", "impact", "numbers", "statistics", "stats", "results", "how much", "people helped", "beneficiaries", "reach", "meals served", "tons rescued", "pledges"],
    answer: "Our impact so far:\n🍽️ 1,810,000+ meals served\n👥 800,000+ people in need reached\n✍️ 15,000+ pledges signed\n♻️ 2,500 tons of food rescued\n📦 2,000+ assistance packages distributed\n🙋 1,000+ active volunteers\n🤝 300+ partners\n\nEvery number represents a real person fed with dignity. 💚",
  },

  // ── VOLUNTEER ───────────────────────────────────────────────────
  {
    triggers: ["volunteer", "volunteering", "hunger hero", "how to help", "join us", "sign up", "get involved", "participate", "roles", "ways to help", "what can i volunteer", "volunteer options", "volunteer roles", "volunteer activities"],
    answer: "Becoming a Hunger Hero is easy! You can:\n🚚 Collect surplus food from our partners\n🍳 Cook & bake in our soup kitchens\n🥄 Serve meals to guests\n📦 Pack Food Assistance Packages\n📣 Help with fundraising & outreach\n🤝 Join food drives\n\nSign up on our Volunteer page, or call +961 70 159 337. Single-day volunteers are always welcome! 💚",
  },

  // ── VOLUNTEER FAQ: EXPERIENCE ────────────────────────────────────
  {
    triggers: ["experience", "skills required", "do i need experience", "background required", "qualifications", "need to know", "prior experience", "trained", "training", "expertise", "professional"],
    priority: 2,
    answer: "No experience needed at all! 😊 FoodBlessed welcomes everyone — students, professionals, retirees, and first-timers alike. All you need is a willingness to help and a warm heart.\n\nFor most roles like serving meals or packing packages, you'll learn everything on the spot. For cooking, basic kitchen comfort is helpful but not required. We'll guide you through everything!",
  },

  // ── VOLUNTEER FAQ: ONE-TIME VS REGULAR ───────────────────────────
  {
    triggers: ["volunteer once", "one time", "single day", "just once", "regular commitment", "how often", "every week", "weekly commitment", "do i have to commit", "flexible schedule", "full time", "part time", "long term", "short term", "long-term", "short-term"],
    priority: 2,
    answer: "Both are welcome! 🙌 FoodBlessed is fully flexible:\n• Drop in for a single day whenever you're free — no strings attached\n• Volunteer short-term for a specific event or campaign\n• Commit long-term and become a regular Hunger Hero\n\nMany of our volunteers start with one day and keep coming back because they love it. Sign up on our Volunteer page and we'll match you to what fits your schedule!",
  },

  // ── VOLUNTEER FAQ: AGE ───────────────────────────────────────────
  {
    triggers: ["age minimum", "minimum age", "how old", "age limit", "age requirement", "too young", "teenager", "student volunteer", "child volunteer", "young volunteer", "youth volunteer", "any age", "all ages"],
    priority: 2,
    answer: "There is no age limit — everyone is welcome! 🌟 Whether you're a student, working professional, retiree, or anywhere in between, FoodBlessed has a role for you.\n\nWe also love welcoming school and university groups for volunteering days. Contact us at +961 70 159 337 to arrange a group visit!",
  },

  // ── LEGITIMACY / REGISTRATION ────────────────────────────────────
  {
    triggers: ["legitimate", "registered", "official", "legal", "certified", "trusted", "real organization", "legit", "accredited", "verified", "recognized", "is foodblessed real", "is it real"],
    priority: 2,
    answer: "Yes, FoodBlessed is a fully legitimate and registered non-profit organization based in Beirut, Lebanon. 🏛️\n\nFounded in 2012 by Maya Terro, we:\n✅ Won the 2013 'CSR in Action — Best Social Project' award\n✅ Partner with 300+ verified businesses and NGOs\n✅ Have served 1.8M+ meals with full transparency\n✅ Are the only registered food rescue entity of our kind in Lebanon\n\nYou can find us on all major platforms @foodblessed.",
  },

  // ── DONATE ──────────────────────────────────────────────────────
  {
    triggers: ["donate", "donation", "give money", "fund", "support financially", "how to donate", "financial support", "sponsor", "contribute"],
    answer: "Every donation goes directly to feeding families in need:\n💳 Donate online via our Donate page\n📦 Fund a Food Assistance Package for just $19 — feeds a family of 4 for a whole month!\n🏢 Corporate sponsorship available\n\nCall +961 3 040 989 or visit our Donate page to contribute. ❤️",
  },

  // ── FOOD ASSISTANCE PACKAGE ─────────────────────────────────────
  {
    triggers: ["food assistance package", "fap", "package", "19 dollars", "$19", "family package", "monthly package", "what is in the package", "package contents", "rice lentils", "staples"],
    priority: 2,
    answer: "A FoodBlessed Food Assistance Package (FAP) costs just $19 and feeds a family of 4 for a full month! 📦\n\nEach package includes:\n• Rice\n• Lentils\n• Chickpeas\n• Vegetable oil\n• Pasta\n• Canned tuna\n• Powder milk\n• Flour\n• And more!\n\nPackages are delivered through our trusted NGO partners to families in need across Lebanon.",
  },

  // ── HOW IT WORKS ────────────────────────────────────────────────
  {
    triggers: ["how does it work", "process", "steps", "rescue cook serve", "workflow", "system", "method", "how do you operate"],
    answer: "Our 3-step model:\n\n🥕 Step 1 — We Rescue\nSurplus food is recovered from restaurants, caterers, supermarkets and events before it goes to waste.\n\n🍲 Step 2 — We Cook & Pack\nHunger Heroes prepare hearty meals and assemble Food Assistance Packages with love in our soup kitchens.\n\n🤝 Step 3 — We Serve\nFree meals and packages reach families, the elderly and refugees through our trusted NGO partners.",
  },

  // ── LOCATION / OFFICE ───────────────────────────────────────────
  {
    triggers: ["where are you", "location", "address", "office", "sin el fil", "beirut", "find you", "visit", "directions", "headquarters"],
    answer: "Our head office is at:\n📍 Confidence Center, Ground Floor, Youssef El Hayek Street, Sin El Fil — facing Sin El Fil Municipality, Beirut, Lebanon.\n\nDrop by to volunteer, donate in person, or just say hello! You can also message us on WhatsApp and a Hunger Hero will respond shortly.",
  },

  // ── CONTACT ─────────────────────────────────────────────────────
  {
    triggers: ["contact", "phone number", "call us", "reach you", "email", "whatsapp", "get in touch", "telephone", "how to reach"],
    answer: "Reach us here:\n📞 Volunteering & donations: +961 70 159 337\n📞 General enquiries: +961 3 040 989\n📍 Sin El Fil, Beirut, Lebanon\n\nYou can also find us on Facebook, Instagram, LinkedIn, and Twitter @foodblessed.",
  },

  // ── COMMUNITY FRIDGE ────────────────────────────────────────────
  {
    triggers: ["community fridge", "free fridge", "public fridge", "take what you need", "leave what you can", "fridge location"],
    priority: 2,
    answer: "The FoodBlessed Community Fridge is a free public fridge — anyone can take what they need or leave what they can! 🧊\n\nIt's part of our commitment to zero food waste and dignified access to food for everyone. Check the Community Fridge page on our website for the nearest fridge location near you.",
  },

  // ── PARTNERS ────────────────────────────────────────────────────
  {
    triggers: ["partners", "partner with you", "food donors", "corporate donors", "who supports", "restaurants donate", "supermarkets", "collaborate", "business partner", "partner program"],
    answer: "FoodBlessed works with 300+ partners including:\n🏪 Restaurants & catering agencies\n🛒 Supermarkets & food retailers\n🌾 Farms & produce markets\n🎉 Event & dining facilities\n🤝 Local NGOs & non-profits\n🕌 Religious & community institutes\n\nWant to donate surplus food or partner with us? Visit the Partners page or call +961 3 040 989!",
  },

  // ── FOOD WASTE ──────────────────────────────────────────────────
  {
    triggers: ["food waste", "wasted food", "surplus food", "throw away food", "landfill", "environmental", "sustainability", "eco", "food rescue"],
    answer: "Food waste is a massive global problem — 1.3 billion tonnes (worth ~$1 trillion) are wasted every year! In Lebanon, nearly 30% of all edible food is wasted. ♻️\n\nFoodBlessed Hunger Heroes intercept perfectly edible food from supermarkets, farms, restaurants and caterers — turning it into wholesome free meals instead of landfill.",
  },

  // ── HUNGER IN LEBANON ───────────────────────────────────────────
  {
    triggers: ["hunger in lebanon", "poverty lebanon", "food insecurity", "syrian refugees", "bekaa", "akkar", "poverty line", "how bad is hunger", "people starving"],
    answer: "Lebanon faces a severe hunger crisis:\n• 30% of the population lives under the poverty line\n• 1 in every 5 residents is a Syrian refugee\n• Bekaa and Akkar record the highest poverty yet receive the least aid\n• Most food-poverty projects collapse when funding runs out\n\nFoodBlessed bridges this gap with a sustainable, community-powered model. 🤲",
  },

  // ── PLEDGE ──────────────────────────────────────────────────────
  {
    triggers: ["pledge", "waste less pledge", "food pledge", "sign pledge", "reduce waste pledge", "take the pledge", "food pledge program"],
    priority: 2,
    answer: "The FoodBlessed Pledge is a personal commitment to be more mindful about food waste. Over 15,000 people have already signed! 🌿\n\nBy taking the pledge, you commit to wasting less food in your daily life. Visit foodblessed.org/pledge to sign — it takes 30 seconds and makes a real difference.",
  },

  // ── MAKE A DIFFERENCE ───────────────────────────────────────────
  {
    triggers: ["make a difference", "makedifferencelb", "campaign", "hashtag", "awareness campaign", "movement"],
    priority: 2,
    answer: "#MakeADifferenceLB is FoodBlessed's awareness campaign encouraging everyone across Lebanon to take action against hunger and food waste. Small everyday choices — donating surplus food, signing the pledge, volunteering — add up to massive community change. Join the movement! 🌟",
  },

  // ── SOCIAL MEDIA ────────────────────────────────────────────────
  {
    triggers: ["facebook", "instagram", "twitter", "linkedin", "social media", "follow foodblessed", "social accounts"],
    answer: "Follow us on social media!\n📘 Facebook: facebook.com/FoodBlessed\n📸 Instagram: @foodblessed\n🐦 Twitter/X: @foodblessed\n💼 LinkedIn: linkedin.com/company/2780209\n\nStay updated on events, impact stories and ways to help!",
  },

  // ── SOUP KITCHEN ────────────────────────────────────────────────
  {
    triggers: ["soup kitchen", "hot meals", "cooked meals", "free meals", "meal program", "where to eat", "meal distribution"],
    answer: "FoodBlessed runs soup kitchens across Lebanon where Hunger Heroes prepare and serve hot, freshly-cooked meals — entirely by volunteers, with love. 🍲\n\nEvery meal is prepared from rescued surplus food. Meals are served free to the elderly, refugees, families and anyone facing food insecurity. Contact us at +961 70 159 337 to find the nearest location.",
  },

  // ── EVENTS ──────────────────────────────────────────────────────
  {
    triggers: ["events", "upcoming events", "bake sale", "fundraiser", "fundraising event", "food drive", "next event"],
    answer: "FoodBlessed regularly organises:\n🎂 Monthly bake sales\n🍱 Food drives to collect perishable & non-perishable items\n🎉 Community fundraising events\n🏃 Volunteer cooking & serving days\n\nFollow us on social media @foodblessed or visit our website to stay updated on upcoming events!",
  },

  // ── RIGHT TO FOOD ───────────────────────────────────────────────
  {
    triggers: ["right to food", "human right", "rights based", "food rights", "dignity", "underprivileged"],
    answer: "FoodBlessed takes a rights-based approach to food — not food-as-charity. The right to sufficient food is enshrined in the International Declaration of Human Rights, yet it's long been overlooked. We provide nutritious meals and packages to people at risk of food insecurity, treating every person with dignity. 🤲",
  },

  // ── CORPORATE SOCIAL RESPONSIBILITY ────────────────────────────
  {
    triggers: ["csr", "corporate social responsibility", "company involvement", "business engagement", "corporate volunteering", "corporate donation"],
    answer: "FoodBlessed is Lebanon's leading platform for Corporate Social Responsibility (CSR) in food rescue. Companies can:\n🏢 Donate surplus food from events or cafeterias\n💰 Sponsor Food Assistance Packages\n👥 Organise corporate volunteering days\n📣 Run internal food drives\n\nFoodBlessed is the only entity in the region linking CSR to food rescue. Call +961 3 040 989 to get your company involved!",
  },

];
