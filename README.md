# Book Search Engine

Book Search Engine application. It allows users to search for books using the Google Books API, save their favorite books and manage their personal collection. The client communicates with a GraphQL backend and provides a modern, responsive user interface.

## Features

- **Book Search:** Search for books by title, author, or keyword.
- **User Authentication:** Sign up, log in, and manage your account securely.
- **Save Books:** Save books to your personal collection.
- **Remove Books:** Remove books from your saved collection.
- **Responsive UI:** Built with React and Bootstrap for a seamless experience on any device.
- **GraphQL Integration:** Uses Apollo Client for efficient data fetching and mutations.

## Technologies Used

- **React** (with Vite)
- **Apollo Client** (GraphQL)
- **React Router**
- **Bootstrap** & **React-Bootstrap**
- **JWT Decode**
- **ESLint** (for code linting)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file in the `client` directory if needed (for example, to set the GraphQL endpoint):

   ```
   VITE_GRAPHQL_ENDPOINT=http://localhost:3001/graphql
   ```

### Running the Application

- **Development Mode:**

  ```sh
  npm run dev
  ```

  The app will be available at [http://localhost:3000](http://localhost:3000).

- **Production Build:**
  ```sh
  npm run build
  npm run preview
  ```

## License

This project is licensed under the MIT License.
