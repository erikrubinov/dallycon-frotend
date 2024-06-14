export async function handleLogout(navigate) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('No access token found.');
        navigate('/login');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Logout successful');
            navigate('/login');
        } else {
            console.error('Logout failed', response.status);
            navigate('/login');
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        navigate('/login');
    }
}
