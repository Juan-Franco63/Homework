// src/App.jsx
import { useState } from 'react';
import TreeViewer from './components/TreeViewer.jsx';
import GraphViewer from './components/GraphViewer.jsx';

export default function App() {
  const [view, setView] = useState('tree');

  return (
    <div className="container">
      <h1>Proyecto 3 – Estructura Organizacional</h1>

      <div className="buttons">
        <button onClick={() => setView('tree')}>Ver Árbol</button>
        <button onClick={() => setView('graph')}>Ver Grafo</button>
      </div>

      {view === 'tree' && <TreeViewer />}
      {view === 'graph' && <GraphViewer />}
    </div>
  );
}
