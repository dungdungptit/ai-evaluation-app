FROM node:18-alpine
WORKDIR /app
# ==== COPY =====
# Copy the package.json and package-lock.json files to the workdir
COPY package*.json ./
# Copy the rest of the files to the workdir
COPY . .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]

# docker build -t getting-started .
# docker run -dp 3000:3000 getting-started