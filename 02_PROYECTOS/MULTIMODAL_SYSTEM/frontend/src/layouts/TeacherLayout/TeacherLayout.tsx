import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Music, Calendar, Video, Users, BookOpen, LogOut } from 'lucide-react';

export const TeacherLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <Music className="w-6 h-6 text-purple-500" />
            <div>
              <h2 className="font-bold text-sm text-white">PANEL DOCENTE</h2>
              <span className="text-[10px] text-purple-400 font-semibold uppercase">Música & Zoom</span>
            </div>
          </div>

          <nav className="p-4 space-y-1 text-sm">
            <Link to="/music/teacher/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Mis Clases</span>
            </Link>
            <Link to="/music/teacher/zoom" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Video className="w-4 h-4 text-purple-400" />
              <span>Iniciar Zoom</span>
            </Link>
            <Link to="/music/teacher/students" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Mis Alumnos</span>
            </Link>
            <Link to="/music/teacher/materials" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Materiales Docentes</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs">
            <p className="font-semibold text-white">{user?.username}</p>
            <p className="text-slate-500">Docente de Música</p>
          </div>
          <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Cerrar sesión">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
