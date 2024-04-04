import express from 'express';

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = req.body;

  // Check if username and/or password are present in request body
  if (!user.username && !user.password) {
    // Return error
    return res.status(400).json({
      message: 'Username/Password is required'
    })
  }

  next()
}