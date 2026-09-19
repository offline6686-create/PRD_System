'use client';

import React from 'react';
import { ExternalLink, GitBranch, Users } from 'lucide-react';
import { PrdProject } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectCardProps {
  project: PrdProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {project.code}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                {project.phase}
              </span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100 mt-2 tracking-tight">
              {project.name}
            </h3>
          </div>
          <button className="text-zinc-400 hover:text-zinc-200 p-1">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Progress</span>
            <span className="text-zinc-200">{project.completionPercent}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${project.completionPercent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <span>{project.teamMembers.join(', ')}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
            <span>Updated {project.updatedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
