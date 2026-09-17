import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, Users, Music, TrendingUp, ShoppingBag, 
  Library, Cpu, Settings, LogOut, Shield 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="font-bold text-sm tracking-wide text-white">PRD_SYSTEM</h2>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">ADMIN PANEL</span>
            </div>
          </div>

          <nav className="p-4 space-y-1 text-sm">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard Global</span>
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Usuarios y Roles</span>
            </Link>
            <Link to="/admin/music" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Music className="w-4 h-4 text-slate-400" />
              <span>Academia de Música</span>
            </Link>
            <Link to="/admin/economy" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Economía</span>
            </Link>
            <Link to="/admin/ecommerce" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>E-commerce</span>
            </Link>
            <Link to="/admin/trading" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Trading</span>
            </Link>
            <Link to="/admin/library" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Library className="w-4 h-4 text-slate-400" />
              <span>Biblioteca Central</span>
            </Link>
            <Link to="/admin/prd-forge" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Cpu className="w-4 h-4 text-slate-400" />
              <span>PRD-Forge Core</span>
            </Link>
          </nav>
        </div>

        {/* User profile footer */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs">
            <p className="font-semibold text-white">{user?.username}</p>
            <p className="text-slate-500">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Cerrar sesión">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
