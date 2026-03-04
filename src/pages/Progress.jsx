import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Progress = () => {
  const { purchasedCapsules, user } = useAuth();

  const completedCapsules = purchasedCapsules.filter(c => c.progress >= 100).length;
  const inProgressCapsules = purchasedCapsules.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStartedCapsules = purchasedCapsules.filter(c => !c.progress || c.progress === 0).length;

  const pieData = [
    { name: 'Completed', value: completedCapsules, color: '#10b981' },
    { name: 'In Progress', value: inProgressCapsules, color: '#0ea5e9' },
    { name: 'Not Started', value: notStartedCapsules, color: '#e5e5e5' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 5 },
    { day: 'Sun', hours: 3 }
  ];

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Capsules',
      value: purchasedCapsules.length,
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: purchasedCapsules.length > 0 
        ? `${Math.round((completedCapsules / purchasedCapsules.length) * 100)}%`
        : '0%',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Clock,
      label: 'Total Hours',
      value: user?.hoursLearned || 0,
      color: 'text-accent-600',
      bg: 'bg-accent-50'
    },
    {
      icon: Award,
      label: 'Certificates',
      value: user?.certificates || 0,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
          Progress Tracking
        </h1>
        <p className="text-neutral-600">Monitor your learning journey and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className={`inline-flex p-3 ${stat.bg} rounded-lg mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-neutral-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-xl text-neutral-900 mb-6">
            Weekly Learning Hours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="day" stroke="#737373" />
              <YAxis stroke="#737373" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px' 
                }}
              />
              <Bar dataKey="hours" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Capsule Distribution */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-xl text-neutral-900 mb-6">
            Capsule Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-xl text-neutral-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {purchasedCapsules.slice(0, 5).map((capsule) => (
            <div key={capsule.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
              <img
                src={capsule.thumbnail}
                alt={capsule.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 mb-1">{capsule.title}</h4>
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div
                    className="bg-primary-600 h-1.5 rounded-full"
                    style={{ width: `${capsule.progress || 0}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-600">
                {capsule.progress || 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
