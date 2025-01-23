// controllers/homeController.ts
import { Request, Response } from 'express';

export const getHomePage = (req: Request, res: Response) => {
  try {
    res.status(200).send(`
      <html>
        <head>
          <title>Home Page</title>
        </head>
        <body>
          <h1>Welcome to the Home Page</h1>
          <p>Explore our products and services!</p>
          <a href="/products">View Products</a>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).send({ error: 'Failed to load home page' });
  }
};
