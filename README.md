<h1>Develop</h1>

<b>npm install</b> необходимо запустить как в корне проекта, так и в папке <b>client</b>.</br>
Файлы в папке <b>config</b> не отслеживаются гитом. В них необходимо прописать данные для
подключения к БД,</br>а так же порт для запуска сервера.

Скрипты для работы с приложением в корневом <b>package.json</b>:</br>
- <b>start</b>: Только для запуска приложения в штатную работу на сервере.</br>
- <b>server</b>: Нужен для скрипта <b>'dev'</b>. Самостоятельно не используется.</br>
- <b>client</b>: Нужен для скрипта <b>'dev'</b>. Самостоятельно не используется.</br>
- <b>client_ci</b>: Нужен для <b>github action</b>. Самостоятельно не используется.</br>
- <b>build</b>: Сборка клиента в режиме <b>production</b>.</br>
- <b>dev</b>: Старт разработки. Запускает как серверную часть, так и клиентскую.

Скрипты в папке <b>client</b> можно не использовать, достаточно тех, которые в корневом <b>package.json</b>.

<b>package-lock.json</b> в папке <b>client</b> не добавлен в <b>.gitignore</b> т.к.</br>он нужен для выполнения команды <b>npm ci</b> в <b>github action</b> во время деплоя.

<h1>Production</h1>

При пуше в <b>master</b> срабатывает <b>github action</b>, который автоматически делает сборку клиентской части</br>
в режиме <b>production</b> в папку <b>client/dist</b> и деплоит следующие файлы на сервер:</br>
- папка <b>client/dist</b></br>
- папка <b>src</b></br>
- файл <b>index.js</b></br>
- файл <b>package.json</b></br>

В файле <b>.github/workflow/deploy.yml</b> необходимо указать хост и имя пользователя для</br>
деплоя. Так же в этом файле можно корректировать количество файлов, которые деплоятся.</br>

После деплоя необходимо запустить на сервере <b>npm install</b>, БД и <b>npm run start</b>