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
7. `POST /api/repos + { url: ‘repo-url’ }` - скачивает репозиторий по указанному URL в теле запроса

API на Express и TypeScript, для запуска требуется node.js v14.11. Можно использовать Yarn v1.22. Тестовый репозиторий находится в директории server/repos. 

Точка входа в приложение `server/src/app.ts`

