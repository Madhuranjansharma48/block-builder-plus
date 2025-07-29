import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeComponent, setSelectedComponent } from '../../store/builderSlice';
import HeroComponent from '../page/HeroComponent';
import TwoColumnComponent from '../page/TwoColumnComponent';
import ImageGridComponent from '../page/ImageGridComponent';
import { ComponentConfig } from '../../types/builder';
import { Trash2, GripVertical } from 'lucide-react';

interface CanvasAreaProps {
  isPreviewMode: boolean;
  isDragging: boolean;
}

export default function CanvasArea({ isPreviewMode, isDragging }: CanvasAreaProps) {
  const dispatch = useDispatch();
  const { layout, selectedComponent } = useSelector((state: RootState) => state.builder);

  const handleComponentClick = (componentId: string) => {
    if (!isPreviewMode) {
      dispatch(setSelectedComponent(
        selectedComponent === componentId ? null : componentId
      ));
    }
  };

  const handleDeleteComponent = (componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeComponent(componentId));
    dispatch(setSelectedComponent(null));
  };

  const renderComponent = (component: ComponentConfig, isSelected: boolean) => {
    const commonProps = {
      component,
      isSelected,
      isPreviewMode,
      onClick: () => handleComponentClick(component.id),
    };

    switch (component.type) {
      case 'hero':
        return <HeroComponent {...commonProps} />;
      case 'twoColumn':
        return <TwoColumnComponent {...commonProps} />;
      case 'imageGrid':
        return <ImageGridComponent {...commonProps} />;
      default:
        return null;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="flex-1 bg-preview-bg overflow-auto">
        <div className="min-h-full">
          {layout.components.map((component) => (
            <div key={component.id}>
              {renderComponent(component, false)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-editor-bg overflow-auto">
      <Droppable droppableId="canvas" type="COMPONENT">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-full p-6 transition-all duration-300
              ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}
            `}
          >
            {layout.components.length === 0 && !isDragging && (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-border rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <GripVertical className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Start Building</h3>
                  <p className="text-muted-foreground">Drag components from the sidebar to begin creating your page</p>
                </div>
              </div>
            )}

            {layout.components.map((component, index) => (
              <Draggable
                key={component.id}
                draggableId={component.id}
                index={index}
              >
                {(provided, snapshot) => {
                  const isSelected = selectedComponent === component.id;
                  
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`
                        group relative mb-4 transition-all duration-300
                        ${snapshot.isDragging ? 'opacity-50 rotate-1 scale-105' : ''}
                        ${isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''}
                      `}
                    >
                      {!isPreviewMode && (
                        <div className="absolute -top-3 left-0 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div
                            {...provided.dragHandleProps}
                            className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1 cursor-grab active:cursor-grabbing shadow-elegant"
                          >
                            <GripVertical className="w-3 h-3" />
                            {component.type}
                          </div>
                          
                          <button
                            onClick={(e) => handleDeleteComponent(component.id, e)}
                            className="bg-destructive text-destructive-foreground p-1 rounded shadow-elegant hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      
                      <div className={isSelected ? 'ring-2 ring-primary rounded-lg' : ''}>
                        {renderComponent(component, isSelected)}
                      </div>
                    </div>
                  );
                }}
              </Draggable>
            ))}
            
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}