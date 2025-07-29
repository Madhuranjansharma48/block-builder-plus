import { ComponentConfig } from '../../types/builder';
import { Button } from '../ui/button';

interface TwoColumnComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  isPreviewMode: boolean;
  onClick?: () => void;
}

export default function TwoColumnComponent({ component, isSelected, isPreviewMode, onClick }: TwoColumnComponentProps) {
  const data = component.data as any; // Type assertion for demo

  return (
    <div 
      className={`
        bg-card rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elegant
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
      onClick={onClick}
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {data.leftHeading}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {data.leftSubtitle}
          </p>
          
          <Button 
            variant="default"
            size="lg"
            className="font-semibold"
          >
            {data.leftCtaText}
          </Button>
        </div>
        
        <div className="relative">
          <img 
            src={data.rightImage}
            alt={data.rightImageAlt}
            className="w-full h-auto rounded-lg shadow-elegant"
          />
        </div>
      </div>
    </div>
  );
}