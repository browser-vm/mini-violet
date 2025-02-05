# Use Node.js 16 as the base image
FROM node:16

# Set the working directory for the container
WORKDIR /app

# Copy backend package.json and install backend dependencies
COPY package.json ./
RUN npm install

# Copy frontend package.json and install frontend dependencies
COPY frontend/package.json ./frontend/
RUN cd frontend && npm install

# Copy the rest of the application files
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose port 3000 for the backend server
EXPOSE 3000

# Set the start command for the backend server
CMD ["npm", "start"]