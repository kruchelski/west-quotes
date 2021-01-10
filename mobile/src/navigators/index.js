// Basic imports
import React, { useContext } from 'react';

// Contexts imports
import { AuthContext } from '../contexts/AuthContext';

// Navigators imports
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator'

const Navigators = () => {
    const { signed } = useContext(AuthContext);
 
    if (signed) {
        return <MainStackNavigator />
    }
    return (
        <AuthStackNavigator />
    );
}

export default Navigators;