'use client';

import React from 'react';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { MOCK_PROJECTS } from '@/lib/mock-data';

export const ProjectsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
