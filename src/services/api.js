// src/services/api.js
// This file will handle all API calls to your .NET backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5192/api';

// Generic API call function
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Product API functions
export const productAPI = {
  // Get all products with optional filters
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  // Get product by ID
  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  // Get products by category
  getByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams({ ...params, category }).toString();
    return apiCall(`/products?${queryString}`);
  },

  // Search products
  search: async (query, params = {}) => {
    const queryString = new URLSearchParams({ ...params, search: query }).toString();
    return apiCall(`/products/search?${queryString}`);
  },

  // Get featured products
  getFeatured: async () => {
    return apiCall('/products/featured');
  },

  // Get best selling products
  getBestSellers: async () => {
    return apiCall('/products/bestsellers');
  },

  // Create new product (admin only)
  create: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product (admin only)
  update: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product (admin only)
  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  }
};

// Category API functions
export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    return apiCall('/categories');
  },

  // Get category by ID
  getById: async (id) => {
    return apiCall(`/categories/${id}`);
  },

  // Get category by slug
  getBySlug: async (slug) => {
    return apiCall(`/categories/slug/${slug}`);
  }
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiCall('/user/profile');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiCall('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // User registration
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // User login
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // User logout
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  }
};

// Cart API functions
export const cartAPI = {
  // Get cart items
  getCart: async () => {
    return apiCall('/cart');
  },

  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    return apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  // Update cart item quantity
  updateItem: async (productId, quantity) => {
    return apiCall('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  // Remove item from cart
  removeItem: async (productId) => {
    return apiCall('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  },

  // Clear cart
  clearCart: async () => {
    return apiCall('/cart/clear', {
      method: 'DELETE',
    });
  }
};

// Order API functions
export const orderAPI = {
  // Create new order
  create: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Get user orders
  getUserOrders: async () => {
    return apiCall('/orders/user');
  },

  // Get order by ID
  getById: async (id) => {
    return apiCall(`/orders/${id}`);
  }
};

// Review API functions
export const reviewAPI = {
  // Get product reviews
  getProductReviews: async (productId) => {
    return apiCall(`/reviews/product/${productId}`);
  },

  // Add review
  addrating: async (reviewData) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }
};

// Mock data for development (remove when connecting to real API)
export const mockData = {
  products: [
    {
      id: '1',
      name: 'Premium Blue Jeans',
      description: 'Comfortable and stylish blue jeans perfect for everyday wear',
      imageurl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
    },
    {
      id: '2',
      name: 'Leather Handbag',
      description: 'Elegant leather handbag with premium quality materials',
      imageurl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
    },
    {
      id: '3',
      name: 'Sport Sneakers',
      description: 'Comfortable sport sneakers for active lifestyle',
      imageurl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
    },
    {
      id: '4',
      name: 'Designer Watch',
      description: 'Luxury designer watch with premium materials',
      imageurl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop',
    },
    {
      id: '5',
      name: 'Cotton T-Shirt',
      description: 'Soft cotton t-shirt available in multiple colors',
      imageurl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
    },
    {
      id: '6',
      name: 'Canvas Backpack',
      description: 'Durable canvas backpack perfect for daily use',
      imageurl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    }
  ],
    
  categories: [
    {
      id: '1',
      name: 'Electronics',
      imageurl: 'https://images.unsplash.com/photo-1580894732444-5a49a77406a4?w=500&h=600&fit=crop',
    },
    {
      id: '2',
      name: 'Accessories',
      imageurl: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&h=600&fit=crop',
    },
    {
      id: '3',
      name: 'Fitness',
      imageurl: 'https://images.unsplash.com/photo-1590080877777-c67d95ec0075?w=500&h=600&fit=crop',
    },
    {
      id: '4',
      name: 'Fashion',
      imageurl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
    },
    {
      id: '5',
      name: 'Shoes',
      imageurl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
    },
    {
      id: '6',
      name: 'Bags',
      imageurl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    },
    {
      id: '7',
      name: 'Home',
      imageurl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&h=600&fit=crop',
    },
    {
      id: '8',
      name: 'Jewellery',
      imageurl: 'https://images.unsplash.com/photo-1607082349739-5c5b5a3d8ff4?w=500&h=600&fit=crop',
    },
    {
      id: '9',
      name: 'Toys',
      imageurl: 'https://images.unsplash.com/photo-1596461404969-9ae70d4f09e1?w=500&h=600&fit=crop',
    }
  ],

  Collection : [
    {
      id: '1',
      name: 'Wireless Earbuds',
      description: 'High-quality wireless earbuds with noise cancellation',
      price: 99.99,
      newPrice: 99.99,
      offPercent: 0,
      image: 'https://images.unsplash.com/photo-1580894732444-5a49a77406a4?w=500&h=600&fit=crop',
      category: 'Electronics',
      rating: 4.5,
      reviewCount: 210,
      inStock: true,
      status: 'in-stock'
    },
    // ... (rest of your collection data)
  ],
};

// Development API functions (using mock data)
// Replace these with real API calls when your .NET backend is ready
export const devProductAPI = {
  getAll: async (params = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let products = [...mockData.products];
    
    // Apply filters
    if (params.category && params.category !== 'all') {
      products = products.filter(p => p.category === params.category);
    }
    
    if (params.search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(params.search.toLowerCase()) ||
        p.description.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    
    // Apply sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => (b.review || 0) - (a.review || 0));
          break;
        default:
          products.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
    
    return { products, total: products.length };
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.products.find(p => p.id === id);
  },

  getFeatured: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.products.slice(0, 4);
  }
};

export const devCategoryAPI = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockData.categories;
  }
};

export const devCollectionAPI = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockData.Collection;
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate delay
    const product = mockData.Collection.find((item) => item.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },
};