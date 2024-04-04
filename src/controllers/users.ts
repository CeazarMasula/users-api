import express from 'express';
import { v4 as uuidv4 } from 'uuid'

// Use MAP as the in-memory database, MAP always make sure there is only one id that exists
const users: Map<string, {
  username: string;
  password: string;
}> = new Map();

// For adding user
export const createUser = async (req: express.Request, res: express.Response) => {
  try {
    // Create unique id
    const id = uuidv4()
    // Add user to map
    users.set(id, req.body)

    // Return success status, message, and the added user
    return res.status(201).json({
      message: 'User has been added',
      user: {
        id,
        ...users.get(id)
      }
    })
  } catch (error) {
    // Return error
    return res.status(400).json({
      error
    })
  }
}

// Get all users
export const getUsers = async function (_: express.Request, res: express.Response) {
  try {
    // Define user object type
    let processedUsers: { id: string; username: string; password: string }[] = []

    // Get all users from map and push all to new array
    users.forEach((user, id) => {
      processedUsers.push({
        id,
        ...user,
      })
    })

    // Return all users
    return res.status(200).json({
      users: processedUsers
    })
  } catch (error) {
    // Return error
    return res.status(400).json({ error })
  }
}

// Get single user based on id
export const getUser = async function (req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    // Get user from MAP
    const user = users.get(id);

    if (!user) {
      // Return NOT FOUND error
      return res.status(404).json({ message: `User doesn't exist.` })
    }

    // Return user
    return res.status(200).json({
      id,
      ...user
    })
  } catch (error) {
    // Return error
    return res.status(400).json({ error })
  }
}

// Update a specific user based on id
export const updateUser = async function (req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    // Get user from MAP
    const user = users.get(id);

    if (!user) {
      // Return NOT FOUND error
      return res.status(404).json({ message: `User doesn't exist.` })
    }

    // Update user details
    users.set(id, {
      ...user,
      ...req.body
    })

    // Return user with updated details
    return res.status(200).json({
      message: 'User has been updated.',
      user: {
        id,
        ...users.get(id)
      }
    })
  } catch (error) {
    // Return error
    return res.status(400).json({ error })
  }
}

//  Delete a specific user from id
export const deleteUser = async function (req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;

    // Get user from MAP
    const user = users.get(id);

    if (!user) {
      // Return NOT FOUND error
      return res.status(404).json({ message: `User doesn't exist.` })
    }

    // Delete user from MAP
    users.delete(id)

    // Return response
    return res.status(200).json({
      message: 'User has been deleted.',
    })
  } catch (error) {
    // Return error
    return res.status(400).json({ error })
  }
}