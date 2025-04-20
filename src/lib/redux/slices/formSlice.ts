import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../../types';

interface FormState {
  currentStep: number;
  formData: Partial<FormData>; 
}

const initialState: FormState = {
  currentStep: 1,
  formData: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.currentStep = 1;
      state.formData = {};
    },
  },
});

export const { setCurrentStep, updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;