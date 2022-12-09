FROM node:18-alpine
# Declaring env
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]





# docker build -t getting-started .
# docker run -dp 3000:3000 getting-started