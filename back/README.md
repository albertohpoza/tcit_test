# TCIT reclutamiento backend

**Description:** Este proyecto esta construido en Node 12, por lo que es necesario usar un gestor de version como [nvm](https://github.com/nvm-sh/nvm). Una vez hecho esto, es necesario crear un fichero .env con el formato mostrado. Solo hace falta poner la direccion de la base de datos (MY_DB_HOST), el nombre del usuario (MY_DB_USER) y la contraseña (MY_DB_PASSWORD).

```bash
PROJECT_NAME=myproject
DB_HOST=MY_DB_HOST
DB_USER=MY_DB_USER
DB_PASSWORD=MY_DB_PASSWORD
DB_PORT=5432
DB_NAME_DEV=myproject_dev
DB_NAME_TEST=myproject_test
DB_NAME_PROD=myproject_prod
SERVER_IP=localhost
SERVER_PORT=3030
DEFAULT_EMAIL_ALIAS=no-reply@myproject.com
SENDGRID_KEY=NONE
DB_LOG=false
JWT_SECRET=and0c2VjcmV0and0c2VjcmV0and0c2VjcmV0MTIzNDU2Nzg5MTBhYmNkZWZnaGlq
MASTER_KEY=bXltYXN0ZXJrZXlteW1hc3RlcmtleW15bWFzdGVya2V5MTIzNDU2Nzg5MTBhYmNkZWZnaGlq
API_ROOT=/api

```

**Levantar servidor:** Una vez clonado el repositorio, es necesario entrar en la carpeta back, luego cargar la version 12 de node para finalmente levantar el servidor,

```bash
cd back
nvm install 12
nvm use 12
npm install
```

Una vez instaladas las dependencias, es necesario crear las tablas en la base de datos del modelo representado en el proyecto de backend. Para hacer esto utilizamos el comando rollback una primera vez, para luego utilizar el dev normalmente

```bash
npm run dev:rollback
npm run dev
```

Con lo anterior, ya estara disponible el servidor en la direccion http://localhost:3030.
