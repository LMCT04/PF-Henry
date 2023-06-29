import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

// Función para guardar el estado en localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.log('Error saving state to localStorage:', error);
  }
};

// Función para cargar el estado desde localStorage
const loadLocalStorageData = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log('Error loading state from localStorage:', error);
    return undefined;
  }
};

// Cargar el estado inicial desde localStorage si está disponible
const initialState = {
  allProducts: [],
  product: [],
  productDetail: {},
  newProduct: {},
  newUser: {},
  user: [],
  ...loadLocalStorageData(),
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

// Suscribirse a cambios en el estado y guardar en localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
