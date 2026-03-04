import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Percent, Shield, ArrowLeft } from 'lucide-react';
import { mockCapsules } from '../data/mockData';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, purchaseCapsule } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    couponCode: ''
  });
  const [discount, setDiscount] = useState(0);

  const capsule = mockCapsules.find((c) => c.id === parseInt(id));

  if (!capsule) {
    return <div>Capsule not found</div>;
  }

  const subtotal = capsule.price;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax - discount;

  const applyCoupon = () => {
    if (formData.couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(Math.round(subtotal * 0.2));
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    purchaseCapsule(capsule);
    navigate(`/payment-success/${capsule.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-3xl font-display font-bold text-neutral-900">
        Complete Your Purchase
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
              Billing Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                label="Billing Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />

              <div className="pt-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={formData.couponCode}
                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                  />
                  <Button type="button" variant="secondary" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Try code: SAVE20 for 20% off
                </p>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  icon={<CreditCard className="w-5 h-5" />}
                  loading={loading}
                >
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </div>

          <div className="card p-6 bg-primary-50 border-primary-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-primary-800">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
              Order Summary
            </h2>

            <div className="mb-6">
              <div className="flex gap-4">
                <img
                  src={capsule.thumbnail}
                  alt={capsule.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                    {capsule.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{capsule.level}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 py-4 border-y border-neutral-200">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-neutral-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax (18% GST)</span>
                <span className="font-medium text-neutral-900">₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    Discount
                  </span>
                  <span className="font-medium text-green-600">-₹{discount}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 mb-6">
              <span className="text-lg font-semibold text-neutral-900">Total</span>
              <span className="text-2xl font-bold text-neutral-900">₹{total}</span>
            </div>

            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                <span>Lifetime access to course materials</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                <span>Certificate upon completion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
