import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Flame } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full w-fit mx-auto mb-4">
            <Flame className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">LPG Booking</h1>
          <p className="text-white/80">Fast, Reliable, Convenient</p>
        </div>

        {/* Auth Forms */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-large p-1">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};