# movies-explorer-api
# backend API дипломного проекта movies-explorer Яндекс.Практикум

## Ссылки:
Публичный IP-адрес сервера - 158.160.109.76
Домен сервера - [api.tatarenko-diploma.nomoredomainsicu.ru](https://api.tatarenko-diploma.nomoredomainsicu.ru/)

### Технологии:
+ NodeJS
+ MongoDB

### Endpoint-ы:
*возвращает информацию о пользователе (email и имя)*
> GET /users/me

*обновляет информацию о пользователе (email и имя)*
> PATCH /users/me

*возвращает все сохранённые текущим пользователем фильмы*
> GET /movies

*создаёт фильм с переданными в теле*
*country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId* 
> POST /movies

*удаляет сохранённый фильм по id*
> DELETE /movies/_id 

### Функционал:
+ Регистрация
+ Авторизация

+ Получение списка фильмов
+ Создание фильма
+ Удаление фильма

+ Центральная обработка ошибок
+ Валидация входящих данных

+ Обновление данных пользователя
+ Получение информации о текущем пользователе

  
## Запуск проекта:
Установить зависимости: `npm install`

Запустить сервер: `npm run start`

Запустить сервер с hot-reload: `npm run dev`

Запустить тесты: `npm run test`

## Чеклист:
- [Критерии диплома веб-разработчика](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)
