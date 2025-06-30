import React, { createContext, useContext, useState } from 'react';

export const landingContext = createContext({
    isStarted: false,
    start: () => {}
});
export const LandingProvider = landingContext.Provider;

export function useLanding() {
    return useContext(landingContext);
}