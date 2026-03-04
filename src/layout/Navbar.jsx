import React, { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'New capsule available: Advanced React Patterns', time: '2h ago', unread: true },
    { id: 2, text: 'Your certificate is ready for download', time: '5h ago', unread: true },
    { id: 3, text: 'Special discount: 40% off on DevOps capsules', time: '1d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-neutral-200 z-30">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search capsules, topics, or instructors..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-large border border-neutral-200 z-50 animate-slide-down">
                  <div className="p-4 border-b border-neutral-200">
                    <h3 className="font-semibold text-neutral-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-primary-50/30' : ''
                        }`}
                      >
                        <p className="text-sm text-neutral-900">{notification.text}</p>
                        <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-neutral-200">
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                <p className="text-xs text-neutral-500">{user?.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </button>

            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-large border border-neutral-200 z-50 animate-slide-down">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 rounded-lg transition-colors text-sm text-neutral-700"
                    >
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        navigate('/my-capsules');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 rounded-lg transition-colors text-sm text-neutral-700"
                    >
                      My Capsules
                    </button>
                    <button
                      onClick={() => {
                        navigate('/payments');
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-100 rounded-lg transition-colors text-sm text-neutral-700"
                    >
                      Payment History
                    </button>
                  </div>
                  <div className="border-t border-neutral-200 p-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-sm text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
