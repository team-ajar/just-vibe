import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

getElementById(elementId: string): HTMLElement | null;
const container = Document.getElementById('root')!;

const root = createRoot(container);
root.render(<App />);
