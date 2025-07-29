export interface ComponentConfig {
  id: string;
  type: 'hero' | 'twoColumn' | 'imageGrid';
  data: HeroData | TwoColumnData | ImageGridData;
}

export interface HeroData {
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: string;
}

export interface TwoColumnData {
  leftHeading: string;
  leftSubtitle: string;
  leftCtaText: string;
  leftCtaUrl: string;
  rightImage: string;
  rightImageAlt: string;
}

export interface ImageGridData {
  images: {
    id: string;
    url: string;
    alt: string;
  }[];
}

export interface LayoutConfig {
  components: ComponentConfig[];
}

export interface BuilderState {
  layout: LayoutConfig;
  isPreviewMode: boolean;
  isDragging: boolean;
  selectedComponent: string | null;
  history: LayoutConfig[];
  historyIndex: number;
  lastSaved: number;
}

export interface DragItem {
  type: string;
  id?: string;
  componentType?: ComponentConfig['type'];
  data?: ComponentConfig['data'];
}

export type ComponentType = 'hero' | 'twoColumn' | 'imageGrid';