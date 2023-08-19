// InventoryContext.js

import React, { createContext, useContext, useReducer } from 'react';

const InventoryStateContext = createContext();
const InventoryDispatchContext = createContext();

const initialState = {
  inventory: [], // Your initial inventory data
};

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Handle ADD_ITEM action
      // ... update state
      return newState;

    case 'REMOVE_ITEM':
      // Handle REMOVE_ITEM action
      // ... update state
      return newState;

    case 'DEDUCT_ITEM':
      // Handle DEDUCT_ITEM action
      // ... update state
      return newState;

    // ... other cases

    default:
      return state;
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  return (
    <InventoryStateContext.Provider value={state}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryStateContext.Provider>
  );
}

export function useInventoryState() {
  const context = useContext(InventoryStateContext);
  if (context === undefined) {
    throw new Error('useInventoryState must be used within an InventoryProvider');
  }
  return context;
}

export function useInventoryDispatch() {
  const context = useContext(InventoryDispatchContext);
  if (context === undefined) {
    throw new Error('useInventoryDispatch must be used within an InventoryProvider');
  }
  return context;
}

export function useInventory() {
  const state = useInventoryState();
  const dispatch = useInventoryDispatch();
  return { state, dispatch };
}
