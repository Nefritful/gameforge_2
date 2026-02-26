import React, { useMemo, useState } from 'react';
import { SceneSelectPage } from './pages/SceneSelectPage.jsx';
import { EditorPage } from './pages/EditorPage.jsx';

export function App() {
  const [scene, setScene] = useState(null);
  const [projectName, setProjectName] = useState('project1');

  const editorKey = useMemo(() => `${projectName}:${scene?.id ?? 'none'}`, [projectName, scene]);

  if (!scene) {
    return (
      <SceneSelectPage
        onOpenScene={(selectedScene, selectedProject) => {
          setProjectName(selectedProject);
          setScene(selectedScene);
        }}
      />
    );
  }

  return <EditorPage key={editorKey} scene={scene} projectName={projectName} onBack={() => setScene(null)} />;
}
