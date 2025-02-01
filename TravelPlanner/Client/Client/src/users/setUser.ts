import { User } from '../model/userModel';

export const registerToDB = async (userData: User) => {
  try {
        const response = await fetch('http://localhost:3005/api/user/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error setting user:', error);
        throw error;
    }
};

export const loginToDB = async (email: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3005/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), 
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data;

    // return await response.json(); 
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
