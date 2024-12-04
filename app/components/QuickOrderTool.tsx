'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface OrderItem {
  id: string;
  productCode: string;
  quantity: number;
}

export default function QuickOrderTool() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', productCode: '', quantity: 1 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: String(items.length + 1),
        productCode: '',
        quantity: 1
      }
    ]);
  };

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the order to your backend
    console.log('Order items:', items);
    // You can add your order submission logic here
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Quick Order Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor={`product-${item.id}`}>Product Code</Label>
                <Input
                  id={`product-${item.id}`}
                  value={item.productCode}
                  onChange={(e) => updateItem(item.id, 'productCode', e.target.value)}
                  placeholder="Enter product code"
                />
              </div>
              
              <div className="w-24">
                <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                />
              </div>

              <Button
                variant="outline"
                size="icon"
                className="mb-0.5"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
              >
                ×
              </Button>
            </div>
          ))}

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={addItem}
              className="w-full"
            >
              Add Another Item
            </Button>

            <Button
              onClick={handleSubmit}
              className="w-full"
            >
              Place Order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
