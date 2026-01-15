cat > README.md << 'EOF'
# PizzaTime 🍕

A full-stack pizza ordering application built with React Native, Expo, Supabase, and Stripe.

## Features

- 🔐 User Authentication with Email Verification
- 🍕 Browse Pizza Menu
- 🛒 Shopping Cart
- 💳 Stripe Payment Integration
- 👨‍💼 Admin Dashboard for Order Management
- 📱 Push Notifications
- 🔔 Real-time Order Updates

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Supabase (PostgreSQL, Authentication, Storage, Edge Functions)
- **Payments**: Stripe
- **Navigation**: Expo Router
- **State Management**: React Query

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Supabase account
- Stripe account

## Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/PizzaTime.git
   cd PizzaTime
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env
```
   
   Then edit `.env` and add your credentials:
   - Get Supabase credentials from: https://supabase.com/dashboard
   - Get Stripe credentials from: https://dashboard.stripe.com

4. **Set up Supabase**
```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Push database migrations
   supabase db push
   
   # Deploy Edge Functions
   supabase functions deploy payment-sheet
   
   # Set Edge Function secrets
   supabase secrets set STRIPE_SECRET_KEY=your_stripe_secret_key
   supabase secrets set EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. **Configure Supabase Auth**
   - Go to your Supabase Dashboard → Authentication → URL Configuration
   - Add redirect URLs:
     - `pizzatime://`
     - `pizzatime://*`
     - `exp://127.0.0.1:8081` (for development)

6. **Start the development server**
```bash
   npx expo start
```

## Project Structure
```
PizzaTime/
├── src/
│   ├── app/                 # Expo Router screens
│   │   ├── (admin)/        # Admin screens
│   │   ├── (auth)/         # Authentication screens
│   │   ├── (user)/         # User screens
│   │   └── cart/           # Cart modal
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities and configurations
│   │   ├── supabase.ts    # Supabase client
│   │   ├── stripe.ts      # Stripe integration
│   │   └── notifications.ts
│   └── providers/          # Context providers
├── supabase/
│   ├── functions/          # Edge Functions
│   └── migrations/         # Database migrations
├── assets/                 # Images and fonts
└── .env                    # Environment variables (not in git)
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## Supabase Database Schema

### Tables

- `profiles` - User profiles with stripe_customer_id and expo_push_token
- `products` - Pizza products
- `orders` - Customer orders
- `order_items` - Order line items

## Stripe Integration

The app uses Stripe Payment Sheet for secure payment processing:

1. User adds items to cart
2. App calls Supabase Edge Function to create payment intent
3. Stripe Payment Sheet is presented
4. Payment is processed securely through Stripe
5. Order is created in database upon successful payment

## Push Notifications

The app uses Expo Push Notifications to notify users about:
- Order status updates
- Order confirmation
- Delivery updates

## Admin Features

Admins can:
- View all orders
- Update order status
- Manage products
- View order history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or open an issue on GitHub.

## Acknowledgments

- Stripe for payment processing
- Supabase for backend infrastructure
- Expo for mobile development framework
EOF
