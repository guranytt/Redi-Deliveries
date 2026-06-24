export const MOCK_BANNERS = [
  { id: '1', title: 'Free Delivery on first order!', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800&h=400', color: 'bg-orange-600' },
  { id: '2', title: '50% off Campus Grill', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800&h=400', color: 'bg-orange-500' },
];

export const MOCK_CATEGORIES = [
  { id: '1', name: 'Burgers', icon: '🍔' },
  { id: '2', name: 'Pizza', icon: '🍕' },
  { id: '3', name: 'Chicken', icon: '🍗' },
  { id: '4', name: 'Drinks', icon: '🥤' },
  { id: '5', name: 'Healthy', icon: '🥗' },
];

export const MOCK_VENDORS = [
  {
    id: 'v1',
    name: "Campus Grill",
    rating: 4.8,
    reviews: 320,
    deliveryTime: "15-25 min",
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800",
    tags: ["Burgers", "American"],
  },
  {
    id: 'v2',
    name: "Slice of Heaven",
    rating: 4.5,
    reviews: 156,
    deliveryTime: "20-35 min",
    minOrder: 15,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    tags: ["Pizza", "Italian"],
  },
  {
    id: 'v3',
    name: "Green Bowl",
    rating: 4.9,
    reviews: 89,
    deliveryTime: "10-20 min",
    minOrder: 12,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    tags: ["Healthy", "Salads"],
  }
];

export const MOCK_MENU = [
  {
    id: 'm1',
    vendorId: 'v1',
    category: 'Popular',
    name: 'Double Smash Burger',
    description: 'Two smashed beef patties, american cheese, house sauce, pickles, brioche bun.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm2',
    vendorId: 'v1',
    category: 'Popular',
    name: 'Crispy Fries',
    description: 'Golden shoestring fries sprinkled with sea salt.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'm3',
    vendorId: 'v1',
    category: 'Meals',
    name: 'Smash Combo',
    description: 'Double Smash Burger, Crispy Fries, and a Drink.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1594212691516-436f7fb7420d?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ord_123',
    vendor: MOCK_VENDORS[0],
    items: [{ menuItem: MOCK_MENU[0], quantity: 1, addons: [] }, { menuItem: MOCK_MENU[1], quantity: 1, addons: [] }],
    total: 19.49,
    status: 'Delivered',
    date: '12 Oct 2023, 14:30'
  },
  {
    id: 'ord_124',
    vendor: MOCK_VENDORS[1],
    items: [],
    total: 25.00,
    status: 'On the way',
    date: 'Today, 12:45'
  }
]
