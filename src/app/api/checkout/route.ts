import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

interface CartItem {
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items, email, name } = (await req.json()) as {
      items: CartItem[];
      email: string;
      name: string;
    };

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Fetch product data from DB to get authoritative prices
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, inStock: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: 'Some products are unavailable' }, { status: 400 });
    }

    const productMap = new Map(products.map(p => [p.id, p]));

    const lineItems = items.map(item => {
      const product = productMap.get(item.productId)!;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description.slice(0, 500),
            ...(product.image ? { images: [product.image] } : {}),
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const total = items.reduce((sum, item) => {
      const product = productMap.get(item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);

    // Create a pending order in DB
    const order = await prisma.order.create({
      data: {
        email,
        name,
        status: 'PENDING',
        total,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: productMap.get(item.productId)!.price,
          })),
        },
      },
    });

    const stripe = getStripe();
    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      metadata: { orderId: order.id },
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
    });

    // Save stripe session id to order
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
