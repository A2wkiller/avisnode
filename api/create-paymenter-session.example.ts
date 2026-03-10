// Example API endpoint for Paymenter integration
// This is a reference implementation - adapt to your backend framework

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  gameId: string;
}

interface OrderData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string | null;
  currency: string;
  return_url: string;
  cancel_url: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orderData: OrderData = req.body;

    // Prepare Paymenter API request
    const paymenterResponse = await fetch(
      `${process.env.PAYMENTER_API_URL}/api/checkout/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PAYMENTER_API_KEY}`,
        },
        body: JSON.stringify({
          amount: Math.round(orderData.total * 118), // Total with GST, in paise
          currency: orderData.currency,
          description: `Game Server Hosting - ${orderData.items.length} server(s)`,
          customer_email: req.body.customerEmail || '',
          items: orderData.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unit_amount: Math.round(item.price * 100), // in paise
          })),
          metadata: {
            order_items: JSON.stringify(orderData.items),
            coupon_code: orderData.coupon,
            discount_amount: orderData.discount,
          },
          success_url: orderData.return_url,
          cancel_url: orderData.cancel_url,
        }),
      }
    );

    if (!paymenterResponse.ok) {
      throw new Error('Paymenter API request failed');
    }

    const paymenterData = await paymenterResponse.json();

    // Return the checkout URL
    res.status(200).json({
      paymenterUrl: paymenterData.checkout_url || paymenterData.url,
      sessionId: paymenterData.id || paymenterData.session_id,
    });
  } catch (error: any) {
    console.error('Paymenter session creation error:', error);
    res.status(500).json({
      error: 'Failed to create payment session',
      details: error.message
    });
  }
}
