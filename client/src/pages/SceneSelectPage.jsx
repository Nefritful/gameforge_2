import React, { useEffect, useState } from 'react';

export function SceneSelectPage({ onOpenScene }) {
  const [login, setLogin] = useState('nefrit@gmail.com');
  const [projectName, setProjectName] = useState('project1');
  const [projects, setProjects] = useState([]);
  const [storagePath, setStoragePath] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/config')
      .then((res) => res.json())
      .then((data) => setStoragePath(data.projectStoragePath))
      .catch(() => setStoragePath('Server unavailable'));
  }, []);

  async function refreshProjects() {
    const res = await fetch(`http://localhost:3001/api/projects?login=${encodeURIComponent(login)}`);
    const data = await res.json();
    setProjects(data.projects ?? []);
  }

  async function createProjectAndOpen() {
    await fetch('http://localhost:3001/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, projectName }),
    });

    onOpenScene({ id: 'scene-main', name: 'Main Scene' }, projectName);
  }

  return (
    <main className="scene-select-page">
      <h1>GameForge No-Code</h1>
      <p>Выберите сцену проекта или создайте новый проект.</p>
      <div className="card">
        <label>Логин пользователя</label>
        <input value={login} onChange={(e) => setLogin(e.target.value)} />

        <label>Имя проекта</label>
        <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />

        <div className="button-row">
          <button onClick={refreshProjects}>Обновить список проектов</button>
          <button onClick={createProjectAndOpen}>Создать проект + открыть сцену</button>
        </div>

        <strong>Хранилище:</strong>
        <code>{storagePath}</code>

        <strong>Проекты пользователя:</strong>
        <ul>
          {projects.map((project) => (
            <li key={project}>
              <button onClick={() => onOpenScene({ id: 'scene-main', name: 'Main Scene' }, project)}>{project}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
