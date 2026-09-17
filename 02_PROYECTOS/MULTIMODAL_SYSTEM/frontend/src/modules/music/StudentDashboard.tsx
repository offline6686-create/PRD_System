import React from 'react';
import { EmptyState } from '../../components/EmptyState';
import { BookOpen, Video, Award } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Mi Academia de Música</h1>
        <p className="text-sm text-slate-400">Espacio personal de estudio, clases grabadas y materiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Mis Cursos</p>
            <p className="text-sm font-bold text-slate-300">0 inscriptos</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <Video className="w-8 h-8 text-cyan-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Próxima Clase Zoom</p>
            <p className="text-sm font-bold text-slate-300">Sin clases pendientes</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <Award className="w-8 h-8 text-cyan-400" />
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Progreso</p>
            <p className="text-sm font-bold text-slate-300">0% completado</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Clases Grabadas Disponibles</h2>
        <EmptyState title="Todavía no tiene clases grabadas asignadas" message="Las grabaciones de sus cursos aparecerán aquí cuando estén disponibles." />
      </div>
    </div>
  );
};
