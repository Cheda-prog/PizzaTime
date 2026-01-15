import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { stripe } from "./_utils/stripe.ts";
import { createOrRetrieveProfile } from "./_utils/supabase.ts";

serve(async (req: Request) => {
  try {
    const { amount } = await req.json();

    let customerId: string;
    
    // Try to get or create a customer for authenticated user
    try {
      customerId = await createOrRetrieveProfile(req);
      console.log('Using authenticated customer:', customerId);
    } catch (authError) {
      // If not authenticated or error, create/reuse a test customer
      console.log('Auth failed, using test customer:', authError.message);
      
      // For guest users, you could create a new customer each time
      // OR reuse a test customer (better for testing)
      const customer = await stripe.customers.create({
        email: 'guest@pizzatime.com',
      });
      customerId = customer.id;
      console.log('Created guest customer:', customerId);
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2023-10-16' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customerId,
      setup_future_usage: 'off_session', // Enable saving payment methods
    });

    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      customer: customerId,
      ephemeralKey: ephemeralKey.secret,
    };

    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in payment-sheet function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});