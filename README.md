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

## Запуск
```bash
npm install
npm run server
npm run dev
```
