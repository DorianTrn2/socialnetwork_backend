# Utiliser une image Node.js comme base
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port défini dans le code
EXPOSE ${PORT}

# Démarrer l'application
CMD [ "npm", "start" ]