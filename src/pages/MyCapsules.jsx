import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';
import Button from '../components/Button';

const MyCapsules = () => {
  const { purchasedCapsules } = useAuth();
  const navigate = useNavigate();

  if (purchasedCapsules.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="card p-12 max-w-md mx-auto">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">
            No Capsules Yet
          </h2>
          <p className="text-neutral-600 mb-6">
            Start your learning journey by exploring our curated capsules
          </p>
          <Button variant="primary" onClick={() => navigate('/explore')}>
            Explore Capsules
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            My Capsules
          </h1>
          <p className="text-neutral-600">
            {purchasedCapsules.length} capsule{purchasedCapsules.length !== 1 ? 's' : ''} in your library
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCapsules.map((capsule) => (
          <div key={capsule.id} className="card group">
            <div className="relative">
              <img
                src={capsule.thumbnail}
                alt={capsule.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="badge bg-white text-neutral-900 shadow-md">
                  {capsule.progress || 0}% Complete
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-lg text-neutral-900 mb-2 line-clamp-2">
                {capsule.title}
              </h3>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
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

              <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Last accessed {new Date(capsule.lastAccessed).toLocaleDateString()}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate(`/learn/${capsule.id}`)}
              >
                Continue Learning
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCapsules;
