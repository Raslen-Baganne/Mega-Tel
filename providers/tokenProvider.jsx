export const tokenProvider = async (userId) => {
    if (!userId) {
      console.log('User data is still loading...');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/stream-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const token = data.token;
  
      console.log('token receved :)');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };