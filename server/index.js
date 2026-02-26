import express from 'express';
import { PORT, PROJECT_STORAGE_PATH } from './config.js';
import { createProject, ensureStorage, listUserProjects } from './db.js';

const app = express();
app.use(express.json());

await ensureStorage();

app.get('/api/config', (_req, res) => {
  res.json({ projectStoragePath: PROJECT_STORAGE_PATH });
});

app.get('/api/projects', async (req, res) => {
  try {
    const login = req.query.login;
    if (!login) {
      return res.status(400).json({ error: 'login is required' });
    }

    const projects = await listUserProjects(login);
    return res.json({ login, projects });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { login, projectName } = req.body;
    if (!login || !projectName) {
      return res.status(400).json({ error: 'login and projectName are required' });
    }

    const result = await createProject(login, projectName);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
