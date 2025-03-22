"use-server";




export async function register(
    name: string,
    email: string,
    password: string,
    
  )
    const base=process.env.NEXT_PUBLIC_API_BASE
   {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${errorMessage}`);
    }
  
    const data = await response.json();
    return { user: data.data };
  }
  