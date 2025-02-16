# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use Nginx to serve the build files
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Expose port 80 to serve the application
EXPOSE 80

# Step 9: Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
