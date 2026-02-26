import fs from 'node:fs/promises';
import path from 'node:path';
import { PROJECT_STORAGE_PATH } from './config.js';

const sanitizeLogin = (login) => encodeURIComponent(login.trim().toLowerCase());

export async function ensureStorage() {
  await fs.mkdir(PROJECT_STORAGE_PATH, { recursive: true });
}

export async function listUserProjects(login) {
  const safeLogin = sanitizeLogin(login);
  const userRoot = path.join(PROJECT_STORAGE_PATH, safeLogin);

  await fs.mkdir(userRoot, { recursive: true });
  const entries = await fs.readdir(userRoot, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

export async function createProject(login, projectName) {
  const safeLogin = sanitizeLogin(login);
  const safeProjectName = projectName.trim();

  if (!safeProjectName) {
    throw new Error('Project name cannot be empty');
  }

  const projectRoot = path.join(PROJECT_STORAGE_PATH, safeLogin, safeProjectName);
  const scenesRoot = path.join(projectRoot, 'scenes');
  await fs.mkdir(scenesRoot, { recursive: true });

  const defaultScene = {
    id: 'scene-main',
    name: 'Main Scene',
    objects: [],
    files: [
      { id: 'folder-scenes', name: 'scenes', type: 'folder', children: [{ id: 'file-main', name: 'main.scene.json', type: 'file' }] }
    ],
  };

  await fs.writeFile(path.join(scenesRoot, 'main.scene.json'), JSON.stringify(defaultScene, null, 2), 'utf8');
  return { projectRoot, safeLogin, safeProjectName };
}
