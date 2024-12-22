import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, HelpCircle, BarChart2, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Chapters', icon: BookOpen, path: '/chapters' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
    { name: 'Reports', icon: BarChart2, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <Link to="/" className="p-6 text-2xl font-bold">Quyl.</Link>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-700 transition-colors cursor-pointer
                ${location.pathname === item.path ? 'bg-gray-700' : ''}`}
            >
              <item.icon className="mr-4 w-6 h-6" />
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
