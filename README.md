# GameForge No-Code Platform (React + Phaser 3)

## Архитектура Editor / Runtime
- **Editor**: React интерфейс для редактирования сцены, дерева объектов, свойств и node-based логики.
- **Runtime**: отдельный Phaser loop, запускается в модальном окне по кнопке "Запустить Runtime".
- **Backend**: Node.js + Express API с отдельным модулем БД (`server/db.js`) для создания проектов пользователей.

## Структура
- `client/src/pages/SceneSelectPage.jsx` — страница выбора/создания сцены.
- `client/src/pages/EditorPage.jsx` — страница визуального редактора.
- `client/src/engine/entities.js` — абстрактные типы `Object`, `Pawn`, `Area`, `UI`.
- `server/db.js` — работа с хранением проектов.
- `server/config.js` — конфиг с `PROJECT_STORAGE_PATH`.

## Хранение пользовательских проектов
Проекты сохраняются в:
`storage/user_projects/<login>/<projectName>`

Пример:
`storage/user_projects/nefrit%40gmail.com/project1`

## Как запустить
Откройте **2 терминала** в корне репозитория.

### 1) Установка зависимостей
```bash
npm install
```

### 2) Запуск backend (порт 3001)
```bash
npm run server
```

### 3) Запуск frontend (порт 5173)
```bash
npm run dev
```

После этого откройте:
- `http://localhost:5173/` — фронтенд
- `http://localhost:3001/api/config` — проверка backend

## Если `ERR_CONNECTION_REFUSED` на `http://localhost:5173/`
Это означает, что Vite dev server не запущен или упал.

Проверьте:
1. Команда `npm run dev` действительно запущена и в логах есть `Local: http://localhost:5173/`.
2. Порт 5173 свободен и не занят другим процессом.
3. Если запускаете в контейнере/на удалённой машине — сервер уже настроен на `0.0.0.0`.
4. Если `npm install` падает с `403 Forbidden`, это проблема доступа к npm registry в окружении, нужно настроить registry/proxy или запускать в среде с доступом к npm.
