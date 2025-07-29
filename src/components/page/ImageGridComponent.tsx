import { ComponentConfig } from '../../types/builder';

interface ImageGridComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  isPreviewMode: boolean;
  onClick?: () => void;
}

export default function ImageGridComponent({ component, isSelected, isPreviewMode, onClick }: ImageGridComponentProps) {
  const data = component.data as any; // Type assertion for demo

  return (
    <div 
      className={`
        bg-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elegant
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
      onClick={onClick}
    >
      <div className="p-8">
        <div className="grid grid-cols-2 gap-4">
          {data.images?.slice(0, 4).map((image: any, index: number) => (
            <div 
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg bg-muted group"
            >
              <img 
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}