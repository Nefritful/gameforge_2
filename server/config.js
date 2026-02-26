import path from 'node:path';

export const PROJECT_STORAGE_PATH = path.resolve(process.cwd(), 'storage/user_projects');
export const PORT = process.env.PORT || 3001;
