
# Military District (Frontend)

![GitHub contributors](https://img.shields.io/github/contributors/ptrvsrg/military-district-frontend?style=flat&label=Contributors&labelColor=222222&color=77D4FC) ![GitHub forks](https://img.shields.io/github/forks/ptrvsrg/military-district-frontend?style=flat&label=Forks&labelColor=222222&color=77D4FC) ![GitHub Repo stars](https://img.shields.io/github/stars/ptrvsrg/military-district-frontend?style=flat&label=Stars&labelColor=222222&color=77D4FC) ![GitHub issues](https://img.shields.io/github/issues/ptrvsrg/military-district-frontend?style=flat&label=Issues&labelColor=222222&color=77D4FC) ![GitHub pull requests](https://img.shields.io/github/issues-pr/ptrvsrg/military-district-frontend?style=flat&label=Pull%20Requests&labelColor=222222&color=77D4FC)

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


## Установка

Клонируйте репозиторий:

```bash
  git clone https://github.com/ptrvsrg/military-district-frontend
```

Установите зависимости:

```bash
  npm install
```
    
## Запуск локально

Создайте файл с переменными среды `.env` и инициализируйте переменные среды:

```bash
  make env
```

Запустите сервер разработки:

```bash
  make dev
```


## Развертывание

Создайте файл с переменными среды `.env` и инициализируйте переменные среды:

```bash
  make env
```

Запустите сборку Docker образа:

```bash
  make build-image IMAGE_NAME=<название образа>
```

Запустите Docker контейнер с приложением:

```bash
  make deploy
```


## Демо

<img src="assets/demo.gif" width="640" height="360" />


## Вклад в проект

Если вы хотите внести свой вклад в проект, вы можете следовать этим шагам:

1. Создайте форк этого репозитория.
2. Внесите необходимые изменения.
3. Создайте pull request, описывая ваши изменения.