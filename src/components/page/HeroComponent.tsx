import { ComponentConfig } from '../../types/builder';
import { Button } from '../ui/button';

interface HeroComponentProps {
  component: ComponentConfig;
  isSelected: boolean;
  isPreviewMode: boolean;
  onClick?: () => void;
}

export default function HeroComponent({ component, isSelected, isPreviewMode, onClick }: HeroComponentProps) {
  const data = component.data as any; // Type assertion for demo

  return (
    <div 
      className={`
        relative min-h-[500px] bg-gradient-hero text-white overflow-hidden rounded-lg cursor-pointer
        transition-all duration-300 hover:shadow-glow
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
      onClick={onClick}
    >
      {data.backgroundImage && (
        <div className="absolute inset-0">
          <img 
            src={data.backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="relative z-10 flex items-center justify-center min-h-[500px] px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {data.heading}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
          
          <Button 
            variant="secondary"
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold"
          >
            {data.ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}