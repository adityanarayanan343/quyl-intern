// src/components/Header.jsx
import {  Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <select className="border rounded-lg px-4 py-2">
          <option>AY 2024-25</option>
        </select>
        <select className="border rounded-lg px-4 py-2">
          <option>CBSE 9</option>
        </select>
      </div>
      <div className="flex items-center space-x-6">
        <Bell className="w-6 h-6 text-gray-600" />
        <User className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
};

export default Header;
