import React from 'react';
import { EmptyState } from '../../components/EmptyState';
import { Calendar, Video, Users } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Panel Docente de Música</h1>
        <p className="text-sm text-slate-400">Gestión académica, clases en vivo y alumnos asignados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <Calendar className="w-8 h-8 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Próxima Clase</p>
            <p className="text-sm font-bold text-slate-300">Sin clases programadas</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <Users className="w-8 h-8 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Alumnos Asignados</p>
            <p className="text-sm font-bold text-slate-300">0 alumnos</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <Video className="w-8 h-8 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Estado Zoom</p>
            <p className="text-sm font-bold text-emerald-400">Zoom API Listo</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Mis Cursos Asignados</h2>
        <EmptyState title="Todavía no tiene cursos creados o asignados" message="Cree o programe una nueva clase para comenzar." />
      </div>
    </div>
  );
};
