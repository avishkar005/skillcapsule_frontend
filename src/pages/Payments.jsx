import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, CreditCard, CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const Payments = () => {
  const { purchasedCapsules } = useAuth();

  const payments = purchasedCapsules.map((capsule, index) => ({
    id: `PAY${Date.now() - index * 100000}`,
    capsule: capsule.title,
    amount: capsule.price,
    date: capsule.purchaseDate,
    status: 'Completed'
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
          Payment History
        </h1>
        <p className="text-neutral-600">View all your transactions and download invoices</p>
      </div>

      {payments.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">
            No Payments Yet
          </h2>
          <p className="text-neutral-600">
            Your payment history will appear here once you make a purchase
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Payment ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Capsule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-neutral-600">{payment.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-neutral-900">
                        {payment.capsule}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-neutral-900">
                        ₹{payment.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 badge badge-success">
                        <CheckCircle className="w-3 h-3" />
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        onClick={() => alert('Invoice downloaded')}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
