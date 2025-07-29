import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addComponent, reorderComponents, setDragging, loadLayout } from '../../store/builderSlice';
import { useToast } from '../../hooks/use-toast';
import ComponentLibrary from './ComponentLibrary';
import CanvasArea from './CanvasArea';
import Toolbar from './Toolbar';
import { ComponentType, LayoutConfig } from '../../types/builder';

export default function PageBuilder() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isPreviewMode, isDragging, layout } = useSelector((state: RootState) => state.builder);

  const handleDragStart = () => {
    dispatch(setDragging(true));
  };

  const handleDragEnd = (result: DropResult) => {
    dispatch(setDragging(false));

    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // Handle moving components within canvas
    if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
      dispatch(reorderComponents({
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
      
      toast({
        title: 'Component moved',
        description: 'Component order has been updated',
      });
      return;
    }

    // Handle adding new components from library to canvas
    if (source.droppableId === 'library' && destination.droppableId === 'canvas') {
      const componentType = draggableId.replace('template-', '') as ComponentType;
      
      dispatch(addComponent({
        type: componentType,
        index: destination.index
      }));
      
      toast({
        title: 'Component added',
        description: `${componentType} component has been added to your page`,
      });
    }
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(layout, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'page-layout.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Layout exported',
      description: 'JSON file has been downloaded',
    });
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const layoutData = JSON.parse(e.target?.result as string) as LayoutConfig;
            dispatch(loadLayout(layoutData));
            toast({
              title: 'Layout imported',
              description: 'Page layout has been restored from file',
            });
          } catch (error) {
            toast({
              title: 'Import failed',
              description: 'Invalid JSON file format',
              variant: 'destructive',
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Toolbar 
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {!isPreviewMode && (
            <div className="w-80 flex-shrink-0">
              <ComponentLibrary isDragging={isDragging} />
            </div>
          )}
          
          <CanvasArea 
            isPreviewMode={isPreviewMode}
            isDragging={isDragging}
          />
        </DragDropContext>
      </div>
    </div>
  );
}