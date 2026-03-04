import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Calendar, Edit2, Save, Chrome } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

export const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSave = () => {
    // Save logic here
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-neutral-900">Profile Settings</h1>

      {/* Profile Info */}
      <div className="card p-8">
        <div className="flex items-start gap-6 mb-8">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-1">
              {user?.name}
            </h2>
            <p className="text-neutral-600 mb-4">{user?.email}</p>
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user?.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Button
            variant={editing ? 'primary' : 'secondary'}
            icon={editing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            onClick={() => editing ? handleSave() : setEditing(true)}
          >
            {editing ? 'Save' : 'Edit Profile'}
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            icon={<UserIcon className="w-5 h-5" />}
            disabled={!editing}
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            icon={<Mail className="w-5 h-5" />}
            disabled={!editing}
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
          <Button variant="primary">Update Password</Button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
          Connected Accounts
        </h3>
        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Chrome className="w-6 h-6 text-neutral-700" />
            </div>
            <div>
              <p className="font-medium text-neutral-900">Google</p>
              <p className="text-sm text-neutral-600">Connected</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Disconnect</Button>
        </div>
      </div>
    </div>
  );
};

// Learn Page Component
import { useParams } from 'react-router-dom';
import { mockCapsules } from '../data/mockData';
import { Check, PlayCircle, FileText } from 'lucide-react';

export const Learn = () => {
  const { id } = useParams();
  const { updateProgress, purchasedCapsules } = useAuth();
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());

  const capsule = mockCapsules.find((c) => c.id === parseInt(id));
  const purchased = purchasedCapsules.find((c) => c.id === parseInt(id));

  if (!capsule || !purchased) {
    return <div>Capsule not found or not purchased</div>;
  }

  const modules = Array.from({ length: capsule.modules }, (_, i) => ({
    id: i,
    title: `Module ${i + 1}: Core Concepts`,
    type: i % 2 === 0 ? 'video' : 'pdf',
    duration: '45 min'
  }));

  const handleMarkComplete = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);

    const progress = Math.round((newCompleted.size / modules.length) * 100);
    updateProgress(capsule.id, progress);

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
      {/* Module List */}
      <div className="lg:col-span-1 card p-6 h-fit sticky top-24">
        <h2 className="font-display font-bold text-lg text-neutral-900 mb-4">
          {capsule.title}
        </h2>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
            <span>Overall Progress</span>
            <span className="font-medium">{purchased.progress || 0}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
              style={{ width: `${purchased.progress || 0}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setCurrentModule(module.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentModule === module.id
                  ? 'bg-primary-50 border-2 border-primary-500'
                  : 'bg-neutral-50 border-2 border-transparent hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  completedModules.has(module.id)
                    ? 'bg-green-500'
                    : 'bg-neutral-300'
                }`}>
                  {completedModules.has(module.id) ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs text-white font-medium">{module.id + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {module.title}
                  </p>
                  <p className="text-xs text-neutral-600">{module.duration}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Viewer */}
      <div className="lg:col-span-3 space-y-6">
        <div className="card p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-900">
              {modules[currentModule].title}
            </h1>
            {modules[currentModule].type === 'video' ? (
              <PlayCircle className="w-6 h-6 text-primary-600" />
            ) : (
              <FileText className="w-6 h-6 text-accent-600" />
            )}
          </div>

          {/* Content Area */}
          <div className="bg-neutral-900 rounded-xl h-96 flex items-center justify-center mb-6">
            {modules[currentModule].type === 'video' ? (
              <div className="text-center text-white">
                <PlayCircle className="w-20 h-20 mx-auto mb-4" />
                <p className="text-lg">Video Player Placeholder</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <FileText className="w-20 h-20 mx-auto mb-4" />
                <p className="text-lg">PDF Viewer Placeholder</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              disabled={currentModule === 0}
              onClick={() => setCurrentModule(currentModule - 1)}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleMarkComplete}
              icon={<Check className="w-5 h-5" />}
            >
              {completedModules.has(currentModule) ? 'Completed' : 'Mark as Complete'}
            </Button>
            <Button
              variant="secondary"
              disabled={currentModule === modules.length - 1}
              onClick={() => setCurrentModule(currentModule + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Module Description */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-lg text-neutral-900 mb-3">
            About this Module
          </h3>
          <p className="text-neutral-700">
            In this module, you'll learn the core concepts and fundamentals. This comprehensive
            lesson covers essential topics and provides hands-on examples to reinforce your
            understanding.
          </p>
        </div>
      </div>
    </div>
  );
};
