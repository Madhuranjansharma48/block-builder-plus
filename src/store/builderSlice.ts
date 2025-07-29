import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentConfig, LayoutConfig, BuilderState } from '../types/builder';

const createDefaultHero = (): ComponentConfig => ({
  id: `hero-${Date.now()}`,
  type: 'hero',
  data: {
    heading: 'Welcome to Our Amazing Product',
    subtitle: 'Build stunning landing pages with our drag-and-drop page builder',
    ctaText: 'Get Started',
    ctaUrl: '#',
    backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop'
  }
});

const createDefaultTwoColumn = (): ComponentConfig => ({
  id: `two-column-${Date.now()}`,
  type: 'twoColumn',
  data: {
    leftHeading: 'Powerful Features',
    leftSubtitle: 'Discover the capabilities that make our solution stand out from the competition',
    leftCtaText: 'Learn More',
    leftCtaUrl: '#',
    rightImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    rightImageAlt: 'Feature showcase'
  }
});

const createDefaultImageGrid = (): ComponentConfig => ({
  id: `image-grid-${Date.now()}`,
  type: 'imageGrid',
  data: {
    images: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
        alt: 'Analytics dashboard'
      },
      {
        id: '2', 
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        alt: 'Data visualization'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=400&fit=crop',
        alt: 'Mobile app interface'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
        alt: 'Team collaboration'
      }
    ]
  }
});

const initialState: BuilderState = {
  layout: {
    components: []
  },
  isPreviewMode: false,
  isDragging: false,
  selectedComponent: null,
  history: [{ components: [] }],
  historyIndex: 0,
  lastSaved: Date.now()
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<{ type: ComponentConfig['type']; index?: number }>) => {
      let newComponent: ComponentConfig;
      
      switch (action.payload.type) {
        case 'hero':
          newComponent = createDefaultHero();
          break;
        case 'twoColumn':
          newComponent = createDefaultTwoColumn();
          break;
        case 'imageGrid':
          newComponent = createDefaultImageGrid();
          break;
        default:
          return;
      }

      const index = action.payload.index ?? state.layout.components.length;
      state.layout.components.splice(index, 0, newComponent);
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ components: [...state.layout.components] });
      state.historyIndex = state.history.length - 1;
    },

    reorderComponents: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedComponent] = state.layout.components.splice(sourceIndex, 1);
      state.layout.components.splice(destinationIndex, 0, movedComponent);
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ components: [...state.layout.components] });
      state.historyIndex = state.history.length - 1;
    },

    removeComponent: (state, action: PayloadAction<string>) => {
      state.layout.components = state.layout.components.filter(c => c.id !== action.payload);
      
      // Add to history
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ components: [...state.layout.components] });
      state.historyIndex = state.history.length - 1;
    },

    updateComponent: (state, action: PayloadAction<ComponentConfig>) => {
      const index = state.layout.components.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.layout.components[index] = action.payload;
        
        // Add to history
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push({ components: [...state.layout.components] });
        state.historyIndex = state.history.length - 1;
      }
    },

    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },

    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },

    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponent = action.payload;
    },

    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.layout = { ...state.history[state.historyIndex] };
      }
    },

    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.layout = { ...state.history[state.historyIndex] };
      }
    },

    loadLayout: (state, action: PayloadAction<LayoutConfig>) => {
      state.layout = action.payload;
      state.history = [action.payload];
      state.historyIndex = 0;
    },

    updateLastSaved: (state) => {
      state.lastSaved = Date.now();
    }
  }
});

export const {
  addComponent,
  reorderComponents,
  removeComponent,
  updateComponent,
  setPreviewMode,
  setDragging,
  setSelectedComponent,
  undo,
  redo,
  loadLayout,
  updateLastSaved
} = builderSlice.actions;

export default builderSlice.reducer;