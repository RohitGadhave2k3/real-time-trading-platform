import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import {
  HomeIcon,
  ChartBarIcon,
  CreditCardIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { toggleTheme } from '../store/slices/themeSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.theme);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Portfolio', href: '/portfolio', icon: ChartBarIcon },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-primary-600">Trading Platform</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <UserCircleIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout; 