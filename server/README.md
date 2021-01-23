![git-api](./git-logo.svg)

# Node.js & Express API
## Для получения данных в формате JSON

### Методы:
1. `GET /api/repos` - получение списка репозиториев
2. `GET /api/repos/:repositoryId/commits/:commitHash` - массив коммитов вместе с их названием
3. `GET /api/repos/:repositoryId/commits/:commitHash/diff` - получение diff указанного в запросе коммита
4. `GET /api/repos/:repositoryId(/tree/:commitHash/:path)` - возвращает содержимое репозитория, то что в скобках опционально
5. `GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile` - возвращает содержимое конкретного файла
6. `DELETE /api/repos/:repositoryId` - удаляет репозиторий
7. `POST /api/repos + { repoUrl: ‘repo-url’ }` - скачивает репозиторий по указанному URL в теле запроса
8. `GET /api/repos/:repositoryId/branch?all=[true]?` - получаем список веток репозитория 

API на Express и TypeScript, для запуска требуется node.js v14.11. Можно использовать Yarn v1.22. Тестовый репозиторий находится в директории server/repos. 

Точка входа в приложение `server/src/app.ts`

В файле server/.env указывается папка с репозиториями с которой будет работать api

Для того что бы client работал, нужно как минимум запустить сервер. Как это сделать указано ниже.

### Запуск сервера:
1. Выполнить в папке проекта команду `yarn` или `npm install`
2. `yarn start:watch` или `npm run start:watch` или `npm run start`
3. Для запуска сервера с определенными env переменными может понадобится установить пакет cross-env
