// components/PaymentOptions.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CartItem {
  id: string | number;
  name?: string;
  title?: string;
  price?: number;
  amount?: number;
  quantity: number;
  image?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  available: boolean;
  icon: string;
}

interface UPIApp {
  name: string;
  icon: string;
  packageName: string;
}

interface PaymentOptionsProps {
  cartItems: CartItem[];
  totalAmount: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ cartItems, totalAmount }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showUPIApps, setShowUPIApps] = useState<boolean>(false);
  const router = useRouter();

  // Your UPI ID - Replace with your actual UPI ID
  const UPI_ID: string = "7697881864@ybl"; // Change this to your UPI ID

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered',
      available: false,
      icon: '💵'
    },
    {
      id: 'upi',
      name: 'Pay on Delivery via UPI',
      description: 'Pay using UPI when order arrives',
      available: true,
      icon: '📱'
    }
  ];

  const upiApps: UPIApp[] = [
    { name: 'PhonePe', icon: '/PhonePe.png', packageName: 'com.phonepe.app' },
    { name: 'Google Pay', icon: '/googlePay.png', packageName: 'com.google.android.apps.nfc.payment' },
    { name: 'Paytm', icon: '/paytem.jpeg', packageName: 'net.one97.paytm' },
    { name: 'BHIM', icon: '/bhim.jpeg', packageName: 'in.org.npci.upiapp' },
    { name: 'Amazon Pay', icon: '/amazonPay.png', packageName: 'in.amazon.mshop.android.shopping' }
  ];

  const handlePaymentSelection = (paymentId: string): void => {
    setSelectedPayment(paymentId);
    if (paymentId === 'upi') {
      setShowUPIApps(true);
    } else {
      setShowUPIApps(false);
    }
  };

  const handleUPIAppSelection = (app: UPIApp): void => {
    // Generate UPI payment URL
    const amount = totalAmount.toFixed(2);
    const orderId = `ORDER-${Date.now()}`;
    const merchantName = "Amazon Clone Store";
    
    // UPI URL format
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(merchantName)}&tr=${orderId}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment for Order ${orderId}`)}`;
    
    try {
      // Try to open UPI app directly
      window.location.href = upiUrl;
      
      // If direct app opening fails, show payment confirmation after a delay
      setTimeout(() => {
        handlePaymentSuccess(orderId, 'UPI', app.name);
      }, 3000);
      
    } catch (error) {
      // Fallback: Show manual payment instructions
      alert(`Please pay ₹${amount} to UPI ID: ${UPI_ID}\nOrder ID: ${orderId}`);
      handlePaymentSuccess(orderId, 'UPI', app.name);
    }
  };

  const handleCODOrder = (): void => {
    const orderId: string = `COD-${Date.now()}`;
    handlePaymentSuccess(orderId, 'Cash on Delivery', 'N/A');
  };

  const handlePaymentSuccess = (orderId: string, paymentMethod: string, paymentApp: string): void => {
    // Store order details in localStorage (in real app, send to backend)
    const orderDetails = {
      orderId,
      items: cartItems,
      totalAmount,
      paymentMethod,
      paymentApp,
      status: paymentMethod === 'Cash on Delivery' ? 'Confirmed' : 'Payment Pending',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
    };

    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to order confirmation
    router.push(`/order-confirmation?orderId=${orderId}`);
  };

  const proceedWithSelectedPayment = (): void => {
    if (selectedPayment === 'cod') {
      handleCODOrder();
    } else if (selectedPayment === 'upi') {
      setShowUPIApps(true);
    }
  };

  if (showUPIApps) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <button 
            onClick={() => setShowUPIApps(false)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to payment options
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Select UPI App</h2>
          <p className="text-sm text-gray-600">Choose your preferred UPI app to complete payment</p>
          <div className="bg-gray-50 p-3 rounded-lg mt-3">
            <p className="text-sm"><strong>Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
            <p className="text-sm"><strong>UPI ID:</strong> {UPI_ID}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {upiApps.map((app, index) => (
            <button
              key={index}
              onClick={() => handleUPIAppSelection(app)}
              className="w-full flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <span className="text-2xl mr-4">
                <Image
                src={app.icon}
                alt='payment App images'
                width={50}
                height={50}
                className='rounded-[50%]'
                /></span>
              <span className="font-medium text-gray-800">{app.name}</span>
              <span className="ml-auto text-blue-600">→</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> After selecting an app, youll be redirected to make the payment. 
            Your order will be confirmed once payment is completed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Choose Payment Method</h2>
      
      <div className="space-y-4 mb-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="relative">
            <label className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              method.available 
                ? selectedPayment === method.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
            }`}>
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => handlePaymentSelection(e.target.value)}
                disabled={!method.available}
                className="sr-only"
              />
              
              <div className="flex items-center">
                <span className="text-2xl mr-3">{method.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">{method.name}</h3>
                    {!method.available && (
                      <span className="text-xs text-red-600 font-medium">Not Available</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={proceedWithSelectedPayment}
        disabled={!selectedPayment}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          selectedPayment
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {selectedPayment === 'cod' ? 'Place Order' : 'Proceed to Payment'}
      </button>

      {selectedPayment === 'cod' && (
        <p className="text-xs text-gray-600 text-center mt-2">
          Cash on Delivery is currently not available in your area
        </p>
      )}
    </div>
  );
};

export default PaymentOptions;