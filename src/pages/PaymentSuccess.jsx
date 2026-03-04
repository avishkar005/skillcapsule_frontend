import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { mockCapsules } from '../data/mockData';
import Button from '../components/Button';

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const capsule = mockCapsules.find((c) => c.id === parseInt(id));

  const paymentId = `PAY${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="max-w-2xl mx-auto py-12 animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-scale-in">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
          Payment Successful! 🎉
        </h1>
        <p className="text-xl text-neutral-600">
          Your learning journey begins now
        </p>
      </div>

      <div className="card p-8 mb-6">
        <div className="space-y-6">
          <div className="pb-6 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900 mb-4">Purchase Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Payment ID</span>
                <span className="font-mono font-medium text-neutral-900">{paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Date</span>
                <span className="font-medium text-neutral-900">
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Amount Paid</span>
                <span className="font-bold text-neutral-900">₹{capsule?.price}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Capsule Purchased</h3>
            <div className="flex gap-4 p-4 bg-neutral-50 rounded-lg">
              <img
                src={capsule?.thumbnail}
                alt={capsule?.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">{capsule?.title}</h4>
                <p className="text-sm text-neutral-600 mb-2">by {capsule?.instructor}</p>
                <div className="flex gap-2">
                  <span className="badge badge-primary">{capsule?.level}</span>
                  <span className="badge bg-neutral-200 text-neutral-700">{capsule?.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-900 mb-2">
              <strong>Receipt & Access Link Sent!</strong>
            </p>
            <p className="text-sm text-primary-800">
              We've sent a confirmation email to your registered email address with your payment receipt and direct access link to the capsule.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="secondary"
          icon={<Download className="w-5 h-5" />}
          onClick={() => {
            // Simulate invoice download
            alert('Invoice downloaded successfully!');
          }}
        >
          Download Invoice
        </Button>
        <Button
          variant="primary"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          onClick={() => navigate('/my-capsules')}
        >
          Go to My Capsules
        </Button>
      </div>

      <div className="mt-8 text-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/explore')}
        >
          Continue Exploring
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
