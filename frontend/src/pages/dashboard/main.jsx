import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';                  // Tailwind base/components/utilities
import '../../shared/tokens.css';     // design tokens + base styles (after Tailwind so they win)
import { App } from './App.jsx';

const el = document.getElementById('root');
if (el) createRoot(el).render(<App />);
