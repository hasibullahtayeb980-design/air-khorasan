import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouteProvider } from '@/providers/route-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import '@/styles/globals.css';
import { App } from './App';
import { LocaleDirection } from './i18n/types';
import { getLocaleDirection } from './utils/utils';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </RouteProvider>
        </BrowserRouter>
    </React.StrictMode>
);

const localeDirection = getLocaleDirection();

if (localeDirection === LocaleDirection.RightToLeft) {
  document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
}
