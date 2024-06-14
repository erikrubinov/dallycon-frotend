export const handleSubmit = async (event, text, token, setMessage, setShowMessage, navigate, setnewPrompt) => {
    event.preventDefault();
  
    if (!token) {
      console.error('No access token. Please log in.');
      setMessage('No access token. Please log in.'); // Set message
      setShowMessage(true); // Show message
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/create_new_prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: text }),
      });
  
      if (response.ok) {
          setnewPrompt(true)
          setMessage('created new prompt successfully');
          setShowMessage(true);
          console.log('created new prompt successfully');
      } else {
        setMessage('Internal error, try again later');
        setShowMessage(true);
        console.error('Prompt creation failed', response.status);
      }
    } catch (error) {
      setMessage('Internal error, try again later');
      setShowMessage(true);
      console.error('Error during fetch:', error);
    }
};
