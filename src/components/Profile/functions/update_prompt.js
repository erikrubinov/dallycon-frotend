export const handlePromptClick = async (prompt, setMessage, setShowMessage, navigate) => {
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.error('No access token. Please log in.');
      setMessage('No access token. Please log in.'); // Set message
      setShowMessage(true); // Show message
      navigate('/login');
      return;
    }
  
    try {
      // Await the response from the fetch call
      const response = await fetch('http://localhost:8000/update_prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        // Adjust the prompt data sent based on your backend's expected structure
        body: JSON.stringify({ prompt_id: prompt.id, text: prompt.text }),
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setMessage('Prompt update successful');
        setShowMessage(true);
        console.log('Prompt update successful:', data);
      } else {
        setMessage('Internal error, try again later');
        setShowMessage(true);
        console.error('Prompt update failed', response.status);
      }
    } catch (error) {
      setMessage('Internal error, try again later');
      setShowMessage(true);
      console.error('Error during fetch:', error);
    }

    setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    
    // Perform an action when a prompt container is clicked
    console.log("Prompt clicked:", prompt);
  };
  