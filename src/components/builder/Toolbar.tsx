import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setPreviewMode, undo, redo } from '../../store/builderSlice';
import { Button } from '../ui/button';
import { Eye, Edit, Undo2, Redo2, Download, Upload, Save } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface ToolbarProps {
  onExportJSON: () => void;
  onImportJSON: () => void;
}

export default function Toolbar({ onExportJSON, onImportJSON }: ToolbarProps) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isPreviewMode, history, historyIndex, lastSaved } = useSelector((state: RootState) => state.builder);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handlePreviewToggle = () => {
    dispatch(setPreviewMode(!isPreviewMode));
    toast({
      title: isPreviewMode ? 'Edit Mode' : 'Preview Mode',
      description: isPreviewMode ? 'You can now edit components' : 'Viewing as end user would see',
    });
  };

  const handleUndo = () => {
    if (canUndo) {
      dispatch(undo());
      toast({
        title: 'Undone',
        description: 'Last action has been undone',
      });
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      dispatch(redo());
      toast({
        title: 'Redone',
        description: 'Action has been redone',
      });
    }
  };

  const timeSinceLastSave = Math.floor((Date.now() - lastSaved) / 1000);
  const saveStatus = timeSinceLastSave < 5 ? 'Saved' : `Saved ${timeSinceLastSave}s ago`;

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">Page Builder</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isPreviewMode ? "secondary" : "default"}
              size="sm"
              onClick={handlePreviewToggle}
              className="font-medium"
            >
              {isPreviewMode ? (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo}
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo}
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="border-l border-border pl-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onImportJSON}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onExportJSON}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Save className="w-4 h-4 text-success" />
            <span className="text-muted-foreground">{saveStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}