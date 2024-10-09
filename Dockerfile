# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
    
# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npx", "serve", "-s", "build"]
