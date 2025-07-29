import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ComponentType } from '../../types/builder';
import { Layers, Grid3x3, Columns2 } from 'lucide-react';

interface ComponentLibraryProps {
  isDragging: boolean;
}

interface ComponentTemplate {
  type: ComponentType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  preview: string;
}

const componentTemplates: ComponentTemplate[] = [
  {
    type: 'hero',
    name: 'Hero Block',
    description: 'Header with title, subtitle and CTA',
    icon: Layers,
    preview: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop'
  },
  {
    type: 'twoColumn',
    name: 'Two Column',
    description: 'Content left, image right layout',
    icon: Columns2,
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop'
  },
  {
    type: 'imageGrid',
    name: 'Image Grid',
    description: '2x2 optimized image gallery',
    icon: Grid3x3,
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
  }
];

export default function ComponentLibrary({ isDragging }: ComponentLibraryProps) {
  return (
    <div className="bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">Drag to add to your page</p>
      </div>
      
      <Droppable droppableId="library" type="COMPONENT" isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 space-y-4">
            {componentTemplates.map((template, index) => {
          const IconComponent = template.icon;
          
          return (
            <Draggable
              key={template.type}
              draggableId={`template-${template.type}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`
                    bg-secondary rounded-lg p-4 border border-border cursor-grab active:cursor-grabbing
                    hover:shadow-elegant hover:border-primary/20 transition-all duration-300
                    ${snapshot.isDragging ? 'shadow-glow rotate-2 scale-105' : ''}
                    ${isDragging && !snapshot.isDragging ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      
                      <div className="mt-3 rounded-md overflow-hidden">
                        <img 
                          src={template.preview}
                          alt={`${template.name} preview`}
                          className="w-full h-16 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}