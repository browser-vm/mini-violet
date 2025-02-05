# mini-violet

Mini Violet is an ultra-lightweight proxy server built using [Ultraviolet](https://github.com/titaniumnetwork-dev/Ultraviolet). It provides a simple way to proxy URLs and includes a React-based frontend for user interaction.

## Features
- **Proxy Service**: Encode and proxy URLs using Ultraviolet.
- **React Frontend**: A modern, responsive interface for submitting and retrieving proxied URLs.
- **Lightweight**: Minimal dependencies for fast performance.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/browser-vm/mini-violet.git
   cd mini-violet
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application
1. Start the backend server:
   ```bash
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run start
   ```

3. Access the application:
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:5173`

### Building for Production
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. Serve the frontend with the backend:
   - The backend is configured to serve the React app in production mode.

### Project Structure
```
mini-violet/
├── frontend/          # React frontend
│   ├── public/        # Static assets
│   ├── src/           # React components and styles
│   └── package.json   # Frontend dependencies
├── server.js          # Backend server
├── package.json       # Backend dependencies
└── README.md          # Project documentation
```

## License
This project is licensed under the [Apache License 2.0](LICENSE).