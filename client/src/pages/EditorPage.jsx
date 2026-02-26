import React, { useMemo, useState } from 'react';
import { createEntity } from '../engine/entities.js';
import { SceneTree } from '../components/SceneTree.jsx';
import { PropertiesPanel } from '../components/PropertiesPanel.jsx';
import { FileTree } from '../components/FileTree.jsx';
import { VisualEditorCanvas } from '../components/VisualEditorCanvas.jsx';
import { RuntimeModal } from '../components/RuntimeModal.jsx';
import { BlueprintPanel } from '../components/BlueprintPanel.jsx';

const TYPES = ['Object', 'Pawn', 'Area', 'UI'];

export function EditorPage({ scene, projectName, onBack }) {
  const [objects, setObjects] = useState([createEntity('Object', 1), createEntity('Pawn', 1)]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [runtimeOpen, setRuntimeOpen] = useState(false);

  const selected = useMemo(() => objects[selectedIndex] ?? null, [objects, selectedIndex]);

  const createByPrompt = () => {
    const input = prompt(`Введите тип объекта: ${TYPES.join(', ')}`, 'Object');
    if (!input) return;
    const normalized = TYPES.find((type) => type.toLowerCase() === input.toLowerCase()) || 'Object';
    setObjects((prev) => [...prev, createEntity(normalized, prev.length + 1)]);
  };

  return (
    <main className="editor-page">
      <header className="top-bar">
        <button onClick={onBack}>← К выбору сцен</button>
        <strong>{projectName}</strong>
        <span>{scene.name}</span>
        <button onClick={() => setRuntimeOpen(true)}>▶ Запустить Runtime</button>
      </header>

      <section className="workspace-grid">
        <SceneTree objects={objects} onSelect={setSelectedIndex} onCreateFromTree={createByPrompt} />

        <section className="center-column">
          <VisualEditorCanvas onContextCreate={createByPrompt} />
          <FileTree />
          <BlueprintPanel />
        </section>

        <PropertiesPanel
          selected={selected}
          onRename={(newName) =>
            setObjects((prev) => prev.map((item, idx) => (idx === selectedIndex ? { ...item, name: newName } : item)))
          }
        />
      </section>

      <RuntimeModal open={runtimeOpen} onClose={() => setRuntimeOpen(false)} />
    </main>
  );
}
