import { configureStore } from '@reduxjs/toolkit';
import { rootReducer as reducer } from 'rootReducer';

export default configureStore({ reducer });
