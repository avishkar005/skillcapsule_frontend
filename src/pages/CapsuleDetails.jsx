import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, BookOpen, Users, Award, Check, ChevronRight } from 'lucide-react';
import { mockCapsules } from '../data/mockData';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const CapsuleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { purchasedCapsules } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const capsule = mockCapsules.find((c) => c.id === parseInt(id));
  const isPurchased = purchasedCapsules.some((c) => c.id === parseInt(id));

  if (!capsule) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-900">Capsule not found</h2>
        <Button onClick={() => navigate('/explore')} className="mt-4">
          Back to Explore
        </Button>
      </div>
    );
  }

  const handleBuyNow = () => {
    navigate(`/payment/${capsule.id}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={capsule.thumbnail}
            alt={capsule.title}
            className="w-full h-96 object-cover rounded-xl shadow-large"
          />
        </div>

        <div className="card p-6 h-fit sticky top-24">
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              {capsule.originalPrice && (
                <span className="text-lg text-neutral-500 line-through">
                  ₹{capsule.originalPrice}
                </span>
              )}
              <span className="text-4xl font-bold text-neutral-900">₹{capsule.price}</span>
            </div>

            {capsule.originalPrice && (
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                <p className="text-sm font-medium text-accent-700">
                  {Math.round((1 - capsule.price / capsule.originalPrice) * 100)}% OFF - Limited Time!
                </p>
              </div>
            )}

            {isPurchased ? (
              <Button
                variant="success"
                className="w-full"
                onClick={() => navigate(`/learn/${capsule.id}`)}
              >
                Continue Learning
              </Button>
            ) : (
              <Button variant="primary" className="w-full" onClick={handleBuyNow}>
                Buy Now
              </Button>
            )}

            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Duration</span>
                <span className="font-medium text-neutral-900">{capsule.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Modules</span>
                <span className="font-medium text-neutral-900">{capsule.modules}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Level</span>
                <span className="badge badge-primary">{capsule.level}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Students</span>
                <span className="font-medium text-neutral-900">
                  {capsule.students.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-neutral-900">{capsule.rating}</span>
                  <span className="text-neutral-500">({capsule.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="lg:col-span-2">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            {capsule.title}
          </h1>
          <p className="text-xl text-neutral-600 mb-6">{capsule.description}</p>

          <div className="flex items-center gap-4">
            <img
              src={capsule.instructorAvatar}
              alt={capsule.instructor}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-neutral-900">{capsule.instructor}</p>
              <p className="text-sm text-neutral-600">Expert Instructor</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-6">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capsule.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
                Skills You'll Gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {capsule.skills.map((skill, index) => (
                  <span key={index} className="badge badge-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="card p-6">
            <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
              Course Curriculum
            </h3>
            <div className="space-y-3">
              {Array.from({ length: capsule.modules }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-primary-700">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900">
                        Module {index + 1}: Core Concepts
                      </h4>
                      <p className="text-sm text-neutral-600">5 lessons • 45 min</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-neutral-900 mb-2">
                    {capsule.rating}
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(capsule.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600">{capsule.reviews} reviews</p>
                </div>
              </div>
            </div>

            {/* Sample Reviews */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${30 + i}`}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">Student {i}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 mb-2">
                      Excellent course! Very well structured and easy to follow. The instructor
                      explains complex concepts in a simple way.
                    </p>
                    <p className="text-sm text-neutral-500">2 weeks ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CapsuleDetails;
