import React from 'react';
import { GlobalState } from '../GlobalState';

export function useStore() {
    return React.useContext(GlobalState);
}
