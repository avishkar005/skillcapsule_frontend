import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Award, TrendingUp, ArrowRight } from 'lucide-react';
import CapsuleCard from '../components/CapsuleCard';
import { mockCapsules } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Dashboard = () => {
  const { user, purchasedCapsules } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      icon: BookOpen,
      label: 'Capsules Purchased',
      value: user?.totalPurchases || 0,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700'
    },
    {
      icon: Clock,
      label: 'Hours Learned',
      value: user?.hoursLearned || 0,
      color: 'bg-accent-500',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-700'
    },
    {
      icon: Award,
      label: 'Certificates Earned',
      value: user?.certificates || 0,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: TrendingUp,
      label: 'Active Capsules',
      value: purchasedCapsules.filter(c => c.progress < 100).length,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
  ];

  const recommendedCapsules = mockCapsules.slice(0, 3);
  const recentPurchases = purchasedCapsules.slice(0, 2);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="card p-8 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-primary-100 text-lg">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
            <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recently Purchased */}
      {recentPurchases.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-neutral-900">
              Continue Learning
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/my-capsules')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentPurchases.map((capsule) => (
              <div key={capsule.id} className="card p-6">
                <div className="flex gap-4">
                  <img
                    src={capsule.thumbnail}
                    alt={capsule.title}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                      {capsule.title}
                    </h3>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm text-neutral-600 mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{capsule.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${capsule.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/learn/${capsule.id}`)}
                    >
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Capsules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900">
            Recommended for You
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate('/explore')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCapsules.map((capsule) => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="card p-6 bg-gradient-to-br from-accent-50 to-primary-50 border-accent-200">
        <h3 className="font-display font-bold text-lg text-neutral-900 mb-3">
          💡 Pro Tip
        </h3>
        <p className="text-neutral-700">
          Set aside 30 minutes daily for consistent learning. Small daily efforts compound into mastery over time!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
