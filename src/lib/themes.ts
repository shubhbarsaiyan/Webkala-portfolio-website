export interface ThemePalette {
  id: string;
  name: string;
  color: string;
  colors: Record<string, string>;
}

export const THEMES: ThemePalette[] = [
  {
    id: 'atelier-bronze',
    name: 'Atelier Bronze',
    color: '#B89047',
    colors: {
      '50': '#FCFAF7',
      '100': '#F5F1E9',
      '200': '#EAE3D5',
      '300': '#DCD2C0',
      '400': '#C5A880',
      '500': '#AB8A5F',
      '600': '#B89047', // Main accent gold
      '700': '#907047',
      '800': '#785B37',
      '900': '#5F472B',
      '950': '#382F24'
    }
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald & Sage',
    color: '#0F766E',
    colors: {
      '50': '#F4F8F7',
      '100': '#E6F0EE',
      '200': '#CFE2DE',
      '300': '#A7C9C0',
      '400': '#0D9488',
      '500': '#0F766E',
      '600': '#0F766E', // Main accent emerald
      '700': '#115E59',
      '800': '#134E4A',
      '900': '#203A37',
      '950': '#0B1715'
    }
  },
  {
    id: 'executive-navy',
    name: 'Executive Navy',
    color: '#1E3A8A',
    colors: {
      '50': '#F8FAFC',
      '100': '#F1F5F9',
      '200': '#E2E8F0',
      '300': '#CBD5E1',
      '400': '#3B82F6',
      '500': '#2563EB',
      '600': '#1E3A8A', // Main accent navy
      '700': '#1D4ED8',
      '800': '#1E3A8A',
      '900': '#0F172A',
      '950': '#030712'
    }
  }
];