import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  loading: boolean;
  modalOpen: string | null;
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: true,
  loading: false,
  modalOpen: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modalOpen = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = null;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  openModal,
  closeModal,
} = uiSlice.actions;
export default uiSlice.reducer;
