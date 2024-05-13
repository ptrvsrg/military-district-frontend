# Military District (Frontend)

<p align="center">
   <a href="https://github.com/ptrvsrg/military-district-frontend/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/ptrvsrg/military-district-frontend?style=flat&label=Contributors&labelColor=222222&color=77D4FC"/>
   </a>
   <a href="https://github.com/ptrvsrg/military-district-frontend/forks">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/ptrvsrg/military-district-frontend?style=flat&label=Forks&labelColor=222222&color=77D4FC"/>
   </a>
   <a href="https://github.com/ptrvsrg/military-district-frontend/stargazers">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ptrvsrg/military-district-frontend?style=flat&label=Stars&labelColor=222222&color=77D4FC"/>
   </a>
   <a href="https://github.com/ptrvsrg/military-district-frontend/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/ptrvsrg/military-district-frontend?style=flat&label=Issues&labelColor=222222&color=77D4FC"/>
   </a>
   <a href="https://github.com/ptrvsrg/military-district-frontend/pulls">
        <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/ptrvsrg/military-district-frontend?style=flat&label=Pull%20Requests&labelColor=222222&color=77D4FC"/>
   </a>
</p>

Military District - информационная система военного округа. Данная система содержит данные о 
дислокации военных частей, воинской и офицерской структуре, воинских формированиях, военной технике 
и оружии.

## Технологии

- React 18.2.0
- TypeScript 5.4.2
- Vite 5.1.6
- Material UI 5.15.15
- Apollo Client 3.9.7
- Axios 1.6.8
- Mobx 6.12.0
- Leaflet 1.9.4
- i18n 23.10.1
- Styled Components 6.1.8
- ESLint 8.57.0
- Prettier 3.2.5

## Доступные скрипты

Используется NodeJS версии v21.2.0

```shell
make help                                       # Показать справку
make clean                                      # Очистить сгенерированные файлы
make lint                                       # Автоматически исправить проблемы в коде
make env                                        # Создайте файл .env из sample.env
make dev                                        # Запустите локальный сервер для разработки
make build-image IMAGE_NAME=<название образа>   # Создайте Docker образ
make build                                      # Создание статических файлов для развертывания
make deploy PORT=<номер порта>                  # Развертывание в контейнере Docker
```

## Руководство по запуску

1. Запустите скрипт для создания файла с переменными среды:

    ```shell
    make env
    ```

2. Инициализируйте каждую переменную среды в созданном файле `.env`
3. Запустите сборку Docker образа:

    ```shell
    make build-image IMAGE_NAME=<название образа>
    ```

4. Запустите Docker контейнер с приложением:

    ```shell
    make deploy
    ```

## Вклад в проект

Если вы хотите внести свой вклад в проект, вы можете следовать этим шагам:

1. Создайте форк этого репозитория.
2. Внесите необходимые изменения.
3. Создайте pull request, описывая ваши изменения.