import {applyChineseContent} from './chineseContent';

export interface FoodItem {
  id: string;
  name: string;
  rating: number;
  image: string;
  images?: string[];
  highlights: string[];
  note: string;
}

export interface Location {
  id: string;
  name: string;
  shortName: string;
  description: string;
  coverImage: string;
  theme: 'clean' | 'elegant' | 'vibrant';
  mapCoordinates: { top: string; left: string };
  items: FoodItem[];
}

function normalizeLocalAssetPaths(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.startsWith('/Taste-of-jiangan/')
      ? `./${value.slice('/Taste-of-jiangan/'.length)}`
      : value;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = normalizeLocalAssetPaths(item);
    });
    return value;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      (value as Record<string, unknown>)[key] = normalizeLocalAssetPaths(item);
    });
  }

  return value;
}

export const locations: Record<string, Location> = {
  'recommended-restaurants-in-chengdu': {
    id: 'recommended-restaurants-in-chengdu',
    name: 'Recommended Restaurants in Chengdu',
    shortName: 'Recommended Restaurants',
    description: 'Curated list of standout restaurants in Chengdu, showcasing Sichuan specialties and must-visit eateries.',
    coverImage: '/Taste-of-jiangan/chengdu-restaurants/bin-sushi/bin-sushi-set-2.jpg',
    theme: 'elegant',
    mapCoordinates: { top: '85%', left: '55%' },
    items: [
      {
        id: 'chengdu-bin-sushi',
        name: 'Bin Sushi',
        rating: 4.9,
        image: '/Taste-of-jiangan/chengdu-restaurants/bin-sushi/bin-sushi-set-2.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/bin-sushi/bin-sushi-set-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/bin-sushi/bin-sushi-set-2.jpg',
        ],
        highlights: ['Avg. 80 RMB', 'Japanese Chain Restaurant', 'Fresh Salmon'],
        note: 'A great-value Japanese chain with fresh ingredients and consistently satisfying sets. The salmon is especially worth ordering.',
      },
      {
        id: 'chengdu-yuehuayin',
        name: 'Yuehuayin Wagyu Buffet',
        rating: 4.7,
        image: '/Taste-of-jiangan/chengdu-restaurants/yuehuayin/yuehuayin-dish-1.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/yuehuayin/yuehuayin-cover.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/yuehuayin/yuehuayin-dish-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/yuehuayin/yuehuayin-dish-2.jpg',
        ],
        highlights: ['Avg. 150 RMB', 'Wagyu Buffet', 'Sushi, Yakitori & Eel'],
        note: 'A generous buffet choice for a bigger meal, with wagyu, sushi, yakitori, foie gras sushi, and eel. It is a good place for celebrations or group dinners.',
      },
      {
        id: 'chengdu-xiaolongkan-hotpot',
        name: 'Xiaolongkan Hotpot',
        rating: 4.5,
        image: '/Taste-of-jiangan/chengdu-restaurants/xiaolongkan-hotpot/xiaolongkan-hotpot-1.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/xiaolongkan-hotpot/xiaolongkan-hotpot-cover.png',
          '/Taste-of-jiangan/chengdu-restaurants/xiaolongkan-hotpot/xiaolongkan-hotpot-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/xiaolongkan-hotpot/xiaolongkan-hotpot-2.jpg',
        ],
        highlights: ['Avg. 70-90 RMB', 'Sichuan Hotpot', 'Well-Known Chain'],
        note: 'A well-known Sichuan hotpot chain with a lively atmosphere and a distinctive local flavor. It is a good choice when you want a classic Chengdu hotpot experience without taking too much risk.',
      },
      {
        id: 'chengdu-yongjiang-seafood-casserole',
        name: 'Yongjiang Yanhuo',
        rating: 4.6,
        image: '/Taste-of-jiangan/chengdu-restaurants/yongjiang-seafood-casserole/yongjiang-dish-1.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/yongjiang-seafood-casserole/yongjiang-cover.png',
          '/Taste-of-jiangan/chengdu-restaurants/yongjiang-seafood-casserole/yongjiang-dish-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/yongjiang-seafood-casserole/yongjiang-dish-2.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/yongjiang-seafood-casserole/yongjiang-dish-3.jpg',
        ],
        highlights: ['Avg. 70-90 RMB', 'Seafood Casserole', 'Fresh & Comforting'],
        note: 'A seafood casserole restaurant with warm, satisfying flavors. The seafood dishes are fresh and comforting, making it a strong pick when you want something rich but not as heavy as hotpot.',
      },
      {
        id: 'chengdu-dadalong-sushi-canteen',
        name: 'Dadalong Sushi Canteen',
        rating: 4.5,
        image: '/Taste-of-jiangan/chengdu-restaurants/dadalong-sushi-canteen/dadalong-sushi-1.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/dadalong-sushi-canteen/dadalong-sushi-cover.png',
          '/Taste-of-jiangan/chengdu-restaurants/dadalong-sushi-canteen/dadalong-sushi-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/dadalong-sushi-canteen/dadalong-sushi-2.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/dadalong-sushi-canteen/dadalong-sushi-3.jpg',
        ],
        highlights: ['Avg. 70-90 RMB', 'Sushi & Small Plates', 'Near CY Park'],
        note: 'A sushi and small-plates restaurant near CY Park. The surrounding area is pleasant to walk around, so it works well for a relaxed meal plus a short outing.',
      },
    ]
  },
  'small-southwest-gate': {
    id: 'small-southwest-gate',
    name: 'Small Southwest Gate',
    shortName: 'SW Gate',
    description: 'The heartbeat of campus street food. Energetic, loud, and delicious night market vibes.',
    coverImage: '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-1.jpg',
    theme: 'vibrant',
    mapCoordinates: { top: '80%', left: '25%' },
    items: [
      {
        id: 'swg-baiduren',
        name: 'Baiduren Thai Bistro',
        rating: 4.8,
        image: '/Taste-of-jiangan/chengdu-restaurants/baiduren/baiduren-cover.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/baiduren/baiduren-cover.jpg',
        ],
        highlights: ['Avg. 70 RMB', 'Thai Cuisine', 'Comfortable Atmosphere'],
        note: 'A polished Thai restaurant with a pleasant dining environment. It is a reliable choice when you want something flavorful, relaxed, and a little more refined.',
      },
      {
        id: 'swg-fuyou-bistro',
        name: 'Fuyou Bistro',
        rating: 4.7,
        image: '/Taste-of-jiangan/chengdu-restaurants/fuyou-bistro/fuyou-dish-1.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/fuyou-bistro/fuyou-cover.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/fuyou-bistro/fuyou-dish-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/fuyou-bistro/fuyou-dish-2.jpg',
        ],
        highlights: ['Avg. 45 RMB', 'Chinese Cuisine', 'Beautiful Plating'],
        note: 'A charming Chinese restaurant with carefully presented dishes. It is a good pick when you want something affordable but still visually polished.',
      },
      {
        id: 'swg-mangesuo',
        name: 'Mangesuo',
        rating: 4.9,
        image: '/Taste-of-jiangan/chengdu-restaurants/mangesuo/mangesuo-dish-2.jpg',
        images: [
          '/Taste-of-jiangan/chengdu-restaurants/mangesuo/mangesuo-cover.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/mangesuo/mangesuo-dish-1.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/mangesuo/mangesuo-dish-2.jpg',
          '/Taste-of-jiangan/chengdu-restaurants/mangesuo/mangesuo-dish-3.jpg',
        ],
        highlights: ['Avg. 40 RMB', 'Xinjiang Cuisine', 'Standout Pepper Chicken'],
        note: 'A distinctive Xinjiang restaurant with bold, memorable flavors. The pepper chicken is the star dish and makes the visit feel genuinely special.',
      },
      {
    id: 'swg-1',
    name: 'Sichuan Pepper Wontons (藤椒抄手)',
    rating: 4.6,
    image: '/Taste-of-jiangan/Sichuan Pepper Wontons Small SWG.png',
    highlights: ['Avg. 12 RMB', 'Numbing Spicy', 'Authentic Flavor'],
    note: 'A classic local snack. The Sichuan pepper gives it a unique numbing kick that is both refreshing and spicy.',
  },
  {
    id: 'swg-2',
    name: 'Exotic Hot Pot (奇味干锅)',
    rating: 4.5,
    image: '/Taste-of-jiangan/Exotic Hot Pot Small SWG.png',
    highlights: ['Avg. 35 RMB', 'Generous Portions', 'Great Value'],
    note: 'The portions are very generous and overall it is great value for money, though the food is a bit salty and a little greasy.',
  },
  {
    id: 'swg-3',
    name: 'Scissor Potatoes (剪刀土豆)',
    rating: 4.7,
    image: '/Taste-of-jiangan/Scissor Potatoes Small SWG.png',
    highlights: ['Avg. 10 RMB', 'Crispy Outside', 'Classic Street Snack'],
    note: 'A must-try street food at SWG. The potatoes are fried to perfection with a crispy exterior and soft interior.',
  },
  {
    id: 'swg-4',
    name: 'Oyster and Egg Omelet (蚝蛋烧)',
    rating: 4.4,
    image: '/Taste-of-jiangan/Oyster and Egg Omelet Small SWG.png',
    highlights: ['Avg. 10 RMB', 'Fresh Oysters', 'Egg-wrapped'],
    note: 'Savory and aromatic. A perfect quick bite that combines the freshness of seafood with the richness of eggs.',
  },
  {
    id: 'swg-5',
    name: 'Pork in Sweet and Sour Sauce (锅包肉)',
    rating: 4.3,
    image: '/Taste-of-jiangan/small-southwest-gate/sweet-sour-pork/sweet-sour-pork-2.jpg',
    images: [
      '/Taste-of-jiangan/pork in sweet and sour sauceSmall SWG.png',
      '/Taste-of-jiangan/small-southwest-gate/sweet-sour-pork/sweet-sour-pork-2.jpg',
    ],
    highlights: ['Avg. 10 RMB', 'Authentic Sweetness', 'Crunchy Texture'],
    note: 'Made pretty authentically with a lovely sweet flavor, but keep in mind that one serving might not be enough to fill you up.',
  },
  {
    id: 'swg-6',
    name: 'Nanchang-style Mixed Noodles (南昌拌粉)',
    rating: 4.2,
    image: '/Taste-of-jiangan/Nanchang-style Mixed Noodles Small SWG.png',
    highlights: ['Avg. 10 RMB', 'Rich Toppings', 'Savory Sauce'],
    note: 'The taste is quite good with plenty of peanuts and sauce, though I am not sure if it is 100% authentic Nanchang style.',
  },
  {
    id: 'swg-7',
    name: 'Grilled Wheat Gluten (烤面筋)',
    rating: 4.0,
    image: '/Taste-of-jiangan/Gluten Small SWG.png',
    highlights: ['Avg. 8 RMB', 'Chewy Texture', 'Heavy Chili Paste'],
    note: 'Your typical grilled gluten. It is a standard snack, but they tend to be a bit heavy-handed with the chili paste by default.',
  },
  {
    id: 'swg-8',
    name: 'Beef Offal Hot Pot (牛杂煲)',
    rating: 4.1,
    image: '/Taste-of-jiangan/Beef Offal Hot Pot Small SWG.png',
    highlights: ['Avg. 20 RMB', 'Warm & Hearty', 'Mild Seasoning'],
    note: 'The takeout version is a bit less flavorful than dining in, and the seasoning is on the mild side.',
  },
  {
    id: 'swg-9',
    name: 'Fried Rice / Noodles (炒饭/炒粉)',
    rating: 4.5,
    image: '/Taste-of-jiangan/small-southwest-gate/fried-rice-noodles/fried-rice-noodles-2.jpg',
    images: [
      '/Taste-of-jiangan/fried riceSmall SWG.png',
      '/Taste-of-jiangan/small-southwest-gate/fried-rice-noodles/fried-rice-noodles-2.jpg',
    ],
    highlights: ['Avg. 15 RMB', 'Wok Hei (Smoky)', 'Filling Meal'],
    note: 'It smells great and tastes delicious. While there is not much meat for the price, one serving is definitely enough to fill you up.',
  },
  {
    id: 'swg-11',
    name: 'Shaved Ice (冰粉)',
    rating: 4.4,
    image: '/Taste-of-jiangan/small-southwest-gate/shaved-ice/shaved-ice-2.jpg',
    images: [
      '/Taste-of-jiangan/shaved iceSmall SWG.png',
      '/Taste-of-jiangan/small-southwest-gate/shaved-ice/shaved-ice-2.jpg',
      '/Taste-of-jiangan/small-southwest-gate/shaved-ice/shaved-ice-3.jpg',
    ],
    highlights: ['Avg. 8 RMB', 'Rich Toppings', 'Cool & Refreshing'],
    note: 'Not quite as famous as the one at Recommended Restaurants in Chengdu, but still very good with extremely generous toppings.',
  },
  {
    id: 'swg-13',
    name: 'Roujiamo (Chinese Meat Burger)',
    rating: 4.9,
    image: '/Taste-of-jiangan/small-southwest-gate/roujiamo/roujiamo-2.jpg',
    images: [
      '/Taste-of-jiangan/Roujiamo Small SWG.jpg',
      '/Taste-of-jiangan/small-southwest-gate/roujiamo/roujiamo-2.jpg',
    ],
    highlights: ['Avg. 10 RMB', 'Overflowing Meat', 'Highly Recommended'],
    note: 'Highly recommended! It is absolutely packed with meat—just one bite and it is practically overflowing. Very reasonable price.',
  },
  {
    id: 'swg-14',
    name: 'Beicun Fried Chicken',
    rating: 4.9,
    image: '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-2.jpg',
    images: [
      '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-1.jpg',
      '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-2.jpg',
      '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-3.jpg',
      '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-4.jpg',
      '/Taste-of-jiangan/small-southwest-gate/beicun-fried-chicken/beicun-5.jpg',
    ],
    highlights: ['Avg. 30 RMB', 'Korean Rice Bowls', 'Creamy Buldak Noodles'],
    note: 'A very tasty Korean-style option near the gate. The bibimbap-style rice bowls and creamy buldak noodles are rich, satisfying, and easy to recommend.',
  },
  {
    id: 'swg-15',
    name: 'Four-Egg Fried Rice',
    rating: 4.5,
    image: '/Taste-of-jiangan/small-southwest-gate/four-eggs-rice/four-eggs-rice-2.jpg',
    images: [
      '/Taste-of-jiangan/small-southwest-gate/four-eggs-rice/four-eggs-rice-1.jpg',
      '/Taste-of-jiangan/small-southwest-gate/four-eggs-rice/four-eggs-rice-2.jpg',
      '/Taste-of-jiangan/small-southwest-gate/four-eggs-rice/four-eggs-rice-3.jpg',
    ],
    highlights: ['Avg. 20 RMB', 'Egg Fried Rice', 'Simple & Filling'],
    note: 'A solid fried rice choice with a generous egg flavor. It is not flashy, but it is affordable, filling, and good enough for a quick meal.',
  },
    ]
  },
  'canteen-xiyuan': {
    id: 'canteen-xiyuan',
    name: 'The Canteen of Xiyuan',
    shortName: 'Xiyuan',
    description: 'A practical dining area with several canteens and food stalls. Most meals are filling and affordable, though the overall flavor is more decent than outstanding.',
    coverImage: '/Taste-of-jiangan/xiyuan/food-plaza/food-plaza-cover.jpg',
    theme: 'clean',
    mapCoordinates: { top: '45%', left: '35%' },
    items: [
      {
        id: 'xiyuan-first-dining-hall',
        name: 'Xiyuan First Dining Hall',
        rating: 4.2,
        image: '/Taste-of-jiangan/xiyuan/first-dining-hall/first-dining-hall-menu.png',
        images: [
          '/Taste-of-jiangan/xiyuan/first-dining-hall/image.jpg',
          '/Taste-of-jiangan/xiyuan/first-dining-hall/1.jpg',
          '/Taste-of-jiangan/xiyuan/first-dining-hall/1.png',
          '/Taste-of-jiangan/xiyuan/first-dining-hall/self-selected-fried-stir-dishes.jpg',
        ],
        highlights: ['Avg. 15-30 RMB', 'Rice Noodles & Sets', 'Biangbiang Noodles'],
        note: 'The menu is built for everyday campus meals: rice noodles, small stir-fries, spicy mixed bowls, biangbiang noodles, light meals, and combo plates. The biangbiang noodles are the most distinctive option here, while the rest is filling and practical for a quick lunch.',
      },
      {
        id: 'xiyuan-second-dining-hall',
        name: 'Xiyuan Second Dining Hall',
        rating: 4.1,
        image: '/Taste-of-jiangan/xiyuan/second-dining-hall/second-dining-hall-menu.png',
        images: [
          '/Taste-of-jiangan/xiyuan/second-dining-hall/image.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/second-cateen.png',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-0.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-1.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-2.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-3.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-4.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-5.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-6.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-7.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-8.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-9.jpg',
          '/Taste-of-jiangan/xiyuan/second-dining-hall/menu-10.jpg',
        ],
        highlights: ['Avg. 15-30 RMB', 'Northeastern & Cantonese Dishes', 'Mao Cai & Lu Wei'],
        note: 'The updated menu photos show one of the widest selections in Xiyuan: Northeastern dishes, Cantonese-style food, mashed potato rice bowls, Tom Yum rice noodles, self-selected stir-fry, instant noodles, light meals, mao cai, and lu wei. It is useful when you want variety, though the flavor is generally more convenient than memorable.',
      },
      {
        id: 'xiyuan-food-plaza',
        name: 'Xiyuan Food Plaza',
        rating: 4.3,
        image: '/Taste-of-jiangan/xiyuan/food-plaza/snack-city.png',
        images: [
          '/Taste-of-jiangan/xiyuan/food-plaza/image.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/snack-city.png',
          '/Taste-of-jiangan/xiyuan/food-plaza/city.png',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-1.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-2.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-3.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-4.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-5.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-6.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/menu-10.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/8.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/9.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/10.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/food-plaza-dish-1.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/food-plaza-dish-2.jpg',
          '/Taste-of-jiangan/xiyuan/food-plaza/food-plaza-dish-3.jpg',
        ],
        highlights: ['Avg. 12-30 RMB', 'Korean Bibimbap', 'Fresh Porridge & Noodles'],
        note: 'The second-floor food plaza is good for quick meals such as instant noodles, Korean bibimbap, mixed noodles, and freshly cooked porridge. The Korean bibimbap is a strong value pick around 12 RMB, with fresh vegetables and a soft egg; the self-selected stir-fry is also around 12 RMB and has a mild Sichuan flavor that is easy to eat.',
      },
      {
        id: 'xiyuan-jiangyuan-restaurant',
        name: 'Jiangyuan Restaurant',
        rating: 4.1,
        image: '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/jiangyuan-dish-1.jpg',
        images: [
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/jiangyuan-cover.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/menu-0.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/menu-1.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/menu-2.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/menu-3.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/3.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/4.jpg',
          '/Taste-of-jiangan/xiyuan/jiangyuan-restaurant/jiangyuan-dish-1.jpg',
        ],
        highlights: ['Avg. 15-30 RMB', 'Noodles', 'Rice Noodles & Mao Cai'],
        note: 'Jiangyuan focuses on simple warm meals: fine noodles, rice noodles, and mao cai. The new menu photos make it easier to browse the noodle choices before going. It is not especially memorable, but it is convenient when you want something fast and filling.',
      },
      {
        id: 'xiyuan-xinyuan-restaurant',
        name: 'Xinyuan Restaurant',
        rating: 4.3,
        image: '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/xinyuan-menu.png',
        images: [
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/xinyuan-cover.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/xinyuan-menu.png',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/menu-0.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/menu-1.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/5.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/5.png',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/6.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/7.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/xinyuan-dish-1.jpg',
          '/Taste-of-jiangan/xiyuan/xinyuan-restaurant/xinyuan-dish-2.jpg',
        ],
        highlights: ['Avg. 20-30 RMB', 'Order Dishes & Self-Selected Dishes', 'Good for Groups'],
        note: 'Xinyuan offers ordered dishes and self-selected dishes, and it is probably the best-tasting option among the Xiyuan dining halls. The self-selected stir-fry can include blanched cabbage, steamed egg with minced pork sauce, dry pot shrimp, sweet and sour pork tenderloin, and cucumber salad. It costs a bit more, but works well for a casual group meal.',
      },
      {
        id: 'xiyuan-chuanyun-canteen',
        name: 'Chuanyun Canteen',
        rating: 4.2,
        image: '/Taste-of-jiangan/xiyuan/chuanyun-canteen/chuanyun-dish-1.jpg',
        images: [
          '/Taste-of-jiangan/xiyuan/chuanyun-canteen/1.jpg',
          '/Taste-of-jiangan/xiyuan/chuanyun-canteen/2.jpg',
        ],
        highlights: ['Avg. 15-30 RMB', 'Korean Rice Bowls', 'Fried Rice & Noodles'],
        note: 'Chuanyun focuses on Korean-style rice bowls, fried rice, noodles, and other wheat-based staples. It is a straightforward canteen choice: affordable, filling, and fine for daily eating, but not a place to expect standout flavor.',
      },
    ]
  },
  'canteen-dongyuan': {
    id: 'canteen-dongyuan',
    name: 'Takeouts Around SCUPI',
    shortName: 'Takeouts',
    description: 'Convenient takeout options around SCUPI, ranging from quick drinks and breakfast bread to rice bowls, noodles, sushi-style salmon, and dumplings.',
    coverImage: '/Taste-of-jiangan/takeouts-around-scupi/cantonese-roast-goose/roast-goose-cover.png',
    theme: 'clean',
    mapCoordinates: { top: '50%', left: '65%' },
    items: [
      {
        id: 'takeout-mstand',
        name: 'Mstand Coffee',
        rating: 4.4,
        image: '/Taste-of-jiangan/takeouts-around-scupi/mstand/mstand-drink.png',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/mstand/mstand-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/mstand/mstand-drink.png',
        ],
        highlights: ['Avg. 20 RMB', 'Sweet Drinks', 'Dessert-Like Coffee'],
        note: 'Tasty but a little sweet, almost like a calorie bomb. It is a good pick when you want a rich drink rather than a light coffee.',
      },
      {
        id: 'takeout-cantonese-roast-goose',
        name: 'Cantonese Bistro Roast Goose',
        rating: 4.8,
        image: '/Taste-of-jiangan/takeouts-around-scupi/cantonese-roast-goose/roast-goose-cover.png',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/cantonese-roast-goose/roast-goose-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/cantonese-roast-goose/roast-goose-rice.png',
        ],
        highlights: ['Avg. 20 RMB', 'Signature Roast Duck', 'Good Value'],
        note: 'A typical roast duck rice bowl with decent flavor and a fair portion. It is one of the better-value takeout choices near SCUPI.',
      },
      {
        id: 'takeout-salmon-craft-studio',
        name: 'Food Fudega Salmon Craft Studio',
        rating: 4.5,
        image: '/Taste-of-jiangan/takeouts-around-scupi/salmon-craft-studio/salmon-set.jpg',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/salmon-craft-studio/salmon-cover.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/salmon-craft-studio/salmon-set.jpg',
        ],
        highlights: ['Avg. 50 RMB', 'Fresh Salmon', 'Nice Packaging'],
        note: 'The packaging looks polished, and the salmon tastes fresh. It is more expensive than a regular campus meal, but worth trying when you want something cleaner and more special.',
      },
      {
        id: 'takeout-peach-bond-manor',
        name: 'Peach Bond Manor Japanese Cuisine',
        rating: 4.7,
        image: '/Taste-of-jiangan/takeouts-around-scupi/peach-bond-manor/foie-gras-fried-rice.jpg',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/peach-bond-manor/peach-bond-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/peach-bond-manor/foie-gras-fried-rice.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/peach-bond-manor/peach-bond-dish-1.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/peach-bond-manor/peach-bond-dish-2.jpg',
        ],
        highlights: ['Avg. 40 RMB', 'Japanese Cuisine', 'Foie Gras Fried Rice'],
        note: 'The teppan fried rice with foie gras is satisfying and flavorful, though it can be a little salty and slightly oily at the bottom.',
      },
      {
        id: 'takeout-wiki-burger',
        name: 'WIKI Burger',
        rating: 4.4,
        image: '/Taste-of-jiangan/takeouts-around-scupi/wiki-burger/wiki-rice-bowl.png',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/wiki-burger/wiki-burger-cover.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/wiki-burger/wiki-rice-bowl.png',
        ],
        highlights: ['Avg. 25 RMB', 'Rice Bowls', 'Beef & Chicken Thigh Steak'],
        note: 'The beef patty is fragrant, the chicken thigh fillet is tender, and the eggplant sauce with shredded fried potatoes adds a nice texture to the mixed rice.',
      },
      {
        id: 'takeout-hula-noodle',
        name: 'Hula Noodle Restaurant',
        rating: 4.6,
        image: '/Taste-of-jiangan/takeouts-around-scupi/hula-noodle/pea-minced-pork-noodles.png',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/hula-noodle/hula-cover.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/hula-noodle/pea-minced-pork-noodles.png',
        ],
        highlights: ['Avg. 20 RMB', 'Chongqing Noodles', 'Pea & Minced Pork Noodles'],
        note: 'The pea and minced pork noodles are hearty and strongly flavored. Mashed peas soften the spicy minced pork sauce, making the bowl rich, chewy, and satisfying.',
      },
      {
        id: 'takeout-yuen-kee-dumpling',
        name: 'Yuen Kee Dumpling',
        rating: 4.6,
        image: '/Taste-of-jiangan/takeouts-around-scupi/yuen-kee-dumpling/dumplings.jpg',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/yuen-kee-dumpling/yuen-kee-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/yuen-kee-dumpling/chili-oil-wontons.jpg',
          '/Taste-of-jiangan/takeouts-around-scupi/yuen-kee-dumpling/dumplings.jpg',
        ],
        highlights: ['Avg. 25 RMB', 'Dumplings', 'Chili Oil Wontons'],
        note: 'A reliable fast-food choice for dumplings and wontons. The chili oil version has a bold aroma and a satisfying texture without feeling too complicated.',
      },
      {
        id: 'takeout-yxiix',
        name: 'yxiix',
        rating: 4.6,
        image: '/Taste-of-jiangan/takeouts-around-scupi/yxiix/yxiix-bread.png',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/yxiix/yxiix-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/yxiix/yxiix-bread.png',
        ],
        highlights: ['Avg. 30 RMB', 'Breakfast Bread', 'Better Morning Option'],
        note: 'The bread is a better breakfast option than the SCUPI canteen for many mornings. It is simple, filling, and convenient before class.',
      },
      {
        id: 'takeout-huanshi',
        name: 'Huanshi',
        rating: 4.6,
        image: '/Taste-of-jiangan/takeouts-around-scupi/huanshi/huanshi-light-meal.jpg',
        images: [
          '/Taste-of-jiangan/takeouts-around-scupi/huanshi/huanshi-cover.png',
          '/Taste-of-jiangan/takeouts-around-scupi/huanshi/huanshi-light-meal.jpg',
        ],
        highlights: ['Avg. 30 RMB', 'Light Meals', 'Healthy & Filling'],
        note: 'A lighter takeout choice with a healthier feel. It is useful when you want enough energy for the day without ordering something too greasy.',
      },
    ]
  },
  'canteen-scupi': {
    id: 'canteen-scupi',
    name: 'The Canteen of SCUPI',
    shortName: 'SCUPI Canteen',
    description: 'A convenient and budget-friendly campus canteen near SCUPI, best for quick everyday meals rather than destination dining.',
    coverImage: '/Taste-of-jiangan/scupi-canteen/environment/DSC_1455.JPG',
    theme: 'elegant',
    mapCoordinates: { top: '25%', left: '75%' },
    items: [
      {
        id: 'scupi-environment',
        name: 'Dining Area',
        rating: 4.2,
        image: '/Taste-of-jiangan/scupi-canteen/environment/DSC_1456.JPG',
        images: [
          '/Taste-of-jiangan/scupi-canteen/environment/DSC_1455.JPG',
          '/Taste-of-jiangan/scupi-canteen/environment/DSC_1456.JPG',
          '/Taste-of-jiangan/scupi-canteen/environment/DSC_1457.JPG',
        ],
        highlights: ['Avg. 15-20 RMB', 'Convenient Location', 'Spacious Seating'],
        note: 'The dining area is clean, bright, and easy to access between classes. The food is not especially impressive, but the convenience makes it useful for everyday meals.',
      },
      {
        id: 'scupi-stir-fry-window',
        name: 'Stir-Fry Window',
        rating: 4.0,
        image: '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1463.JPG',
        images: [
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1462.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1463.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1464.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1465.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1466.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1467.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1468.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1475.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1476.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1477.JPG',
          '/Taste-of-jiangan/scupi-canteen/stir-fry/DSC_1478.JPG',
        ],
        highlights: ['Avg. 15-20 RMB', 'Rice Bowl Friendly', 'Fast Service'],
        note: 'This is the most practical window for a quick lunch. The flavor is average, but it is filling, affordable, and easy to customize with different stir-fried dishes.',
      },
      {
        id: 'scupi-stewed-dishes-window',
        name: 'Stewed Dishes Window',
        rating: 3.9,
        image: '/Taste-of-jiangan/scupi-canteen/stewed-dishes/DSC_1461.JPG',
        images: [
          '/Taste-of-jiangan/scupi-canteen/stewed-dishes/DSC_1460.JPG',
          '/Taste-of-jiangan/scupi-canteen/stewed-dishes/DSC_1461.JPG',
        ],
        highlights: ['Avg. 15-20 RMB', 'Warm Dishes', 'Simple Home-Style Options'],
        note: 'The stewed dishes are warm and convenient, especially when you want something simple with rice. The taste is mild and not very exciting, but it works for a basic meal.',
      },
      {
        id: 'scupi-cold-dishes-window',
        name: 'Cold Dishes Window',
        rating: 3.8,
        image: '/Taste-of-jiangan/scupi-canteen/cold-dishes/DSC_1459.JPG',
        images: [
          '/Taste-of-jiangan/scupi-canteen/cold-dishes/DSC_1458.JPG',
          '/Taste-of-jiangan/scupi-canteen/cold-dishes/DSC_1459.JPG',
        ],
        highlights: ['Avg. 15-20 RMB', 'Light Options', 'Quick Side Dishes'],
        note: 'A decent choice when you want something lighter or need a quick side. The seasoning is straightforward, so it is more convenient than memorable.',
      },
      {
        id: 'scupi-breakfast-window',
        name: 'Breakfast Window',
        rating: 4.1,
        image: '/Taste-of-jiangan/scupi-canteen/breakfast/DSC_1473.JPG',
        images: [
          '/Taste-of-jiangan/scupi-canteen/breakfast/DSC_1473.JPG',
        ],
        highlights: ['Avg. 15-20 RMB', 'Morning Staples', 'Good for Busy Days'],
        note: 'The breakfast window is useful before morning classes, with simple staples that are quick and affordable. It is not fancy, but it does the job.',
      },
    ]
  },
  'around-scupi': {
    id: 'around-scupi',
    name: 'Around SCUPI',
    shortName: 'Around SCUPI',
    description: 'Hidden gems and cozy spots scattered around the SCUPI building area.',
    coverImage: '/Taste-of-jiangan/around-scupi/brothers-kitchen/brothers-kitchen.png',
    theme: 'vibrant',
    mapCoordinates: { top: '15%', left: '80%' },
    items: [
      
      {
    id: 'as-1',
    name: 'Baijia Zhenzi Rice (白家甄子饭)',
    rating: 4.8,
    image: '/Taste-of-jiangan/zhengzifan.jpg', 
    highlights: ['Avg. 25 RMB', 'Fresh Stir-fry', 'Signature Meat Tofu'],
    note: 'Located just outside the West Gate. The stir-fried pork is fragrant and the "Meat Tofu Pudding" is a unique specialty. Great value for money!',
  },
  {
    id: 'as-2',
    name: 'Maojiezi Intestine Noodle Soup (毛姐子肥肠粉)',
    rating: 4.7,
    image: '/Taste-of-jiangan/Maojiezi Intestine Noodle Soup.jpg',
    highlights: ['Avg. 24 RMB', 'Spicy & Umami', 'Chewy Glass Noodles'],
    note: 'A total hit! The spicy broth is packed with umami, and the chewy glass noodles soak up the amazing flavor perfectly. Very satisfying.',
  },
  {
    id: 'as-3',
    name: 'Hot-and-Dry Noodles (热干面味道)',
    rating: 3.2,
    image: '/Taste-of-jiangan/reganmian.jpg',
    highlights: ['Avg. 16 RMB', 'Quick Meal', 'West Gate Location'],
    note: 'Conveniently located outside the West Gate, but the noodles and preparation are not very authentic. The taste is just average.',
  },
  {
    id: 'as-4',
    name: 'Grilled Channel Catfish (烤清江鱼)',
    rating: 4.9,
    image: '/Taste-of-jiangan/Grilled Channel Catfish.jpg',
    highlights: ['Avg. 35 RMB', 'Few Bones', 'Smoky Aroma'],
    note: 'Highly recommended! It boasts tender flesh with a crispy, charred exterior and a rich, smoky aroma. And the price is not very high.',
  },
  {
    id: 'as-5',
    name: 'Dry Pot of Chicken and Rabbit (鸡兔干锅)',
    rating: 4.5,
    image: '/Taste-of-jiangan/Dry Pot of Chicken and Rabbit.jpg',
    highlights: ['Avg. 35 RMB', 'Spicy & Crunchy', 'Good for Groups'],
    note: 'A very solid dry pot option. The meat is well-seasoned and pairs perfectly with the side vegetables. Definitely worth a try!',
  },
  {
    id: 'as-6',
    name: 'Pork Knuckle & Roast Duck Combo Rice',
    rating: 4.8,
    image: '/Taste-of-jiangan/Pork knuckle&Roast Duck Combo Rice.jpg',
    highlights: ['Avg. 17 RMB', 'tender braised pork knuckle', 'For Single Person'],
    note: 'Its highlight is its 3 - 4 types of unlimited self-service vegetables, which add a nice touch to complement the meal.',
  },
  {
    id: 'as-7',
    name: '15 RMB Stir-Fry',
    rating: 4.9,
    image: '/Taste-of-jiangan/around-scupi/fifteen-yuan-stir-fry/fifteen-yuan-stir-fry.png',
    highlights: ['Avg. 30-40 RMB', '15 RMB Filling Buffet', 'Freshly Cooked Dishes'],
    note: 'A highly recommended spot around SCUPI. The 15 RMB buffet is filling, and you can also order dishes cooked fresh to order. The food tastes very good and feels like strong value for a casual meal.',
  },
  {
    id: 'as-8',
    name: 'Brothers Kitchen',
    rating: 4.7,
    image: '/Taste-of-jiangan/around-scupi/brothers-kitchen/brothers-kitchen.png',
    highlights: ['Avg. 30-40 RMB', 'Sichuan Cuisine', 'Good Everyday Choice'],
    note: 'A solid Sichuan-style restaurant near SCUPI. The dishes are flavorful and practical for everyday meals, especially when you want something warmer and more satisfying than canteen food.',
  },
   ]
  }
};

applyChineseContent(locations);
normalizeLocalAssetPaths(locations);

export const featuredFood = [
  { ...locations['recommended-restaurants-in-chengdu'].items[0], locationId: 'recommended-restaurants-in-chengdu', locationName: locations['recommended-restaurants-in-chengdu'].name },
  { ...locations['small-southwest-gate'].items[0], locationId: 'small-southwest-gate', locationName: locations['small-southwest-gate'].name },
  { ...locations['canteen-scupi'].items[0], locationId: 'canteen-scupi', locationName: locations['canteen-scupi'].name },
];
