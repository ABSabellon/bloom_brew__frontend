# Use an official Node.js runtime as the base image
FROM node:16.17.0 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm i --legacy-peer-deps

# Copy the remaining application files to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight nginx image as the base for serving the application
FROM nginx:1.21.0-alpine

# Copy the built application files to the appropriate location in the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default NGINX configuration with custom configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the container's port (default is 80 for NGINX)
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
