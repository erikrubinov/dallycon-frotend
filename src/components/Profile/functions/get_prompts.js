
  
  export const fetchCurrentPrompt = async (token, setText, navigate) => {
    if (!token) {
      console.error('No access token. Please log in.');
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/get_current_prompt', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setText(data.prompt);
      } else {
        console.error('Failed to fetch the current prompt', response.status);
        if (response.status === 401 || response.status === 403) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  

  export const getPromptBoxes = async (token, setPromptBoxes, navigate) => {
    if (!token) {
      console.error('No access token. Please log in.');
      navigate('/login');
      return;
    }

    // Get the current time in ISO format
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentTime = new Date().toLocaleString('sv-SE', { timeZone: timezone, hour12: false });
    console.log(currentTime)
 
    try {
      const response = await fetch('http://localhost:8000/get_prompt_boxes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentTime })  // Send the current time to the backend
      });
  
      if (response.ok) {
        const data = await response.json();
        setPromptBoxes(data.promptBoxes);
      } else {
        console.error('Failed to fetch prompt boxes', response.status);
        if (response.status === 401 || response.status === 403) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
};