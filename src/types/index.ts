// /src/types/index.ts

export interface Subtotal {
    amount: number;
    currency: string;
  }
  
  export interface CartTotals {
    subtotal: Subtotal;
  }
  
  export interface LineItem {
    _id: string;
    image: string;
    url: string;
    productName: {
      original: string;
    };
    quantity: number;
    price: {
      amount: number;
    };
    availability: {
      status: string;
    };
  }
  
  export interface Cart {
    lineItems: LineItem[];
    totals: CartTotals;
  }
  