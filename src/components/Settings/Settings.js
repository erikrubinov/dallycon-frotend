import React, {} from 'react';
import { useNavigate } from 'react-router-dom';



function Settings() {
    const navigate = useNavigate();

    

    return (
        <div>
            <div className="header">
                <button onClick={() => navigate('/profile')} className="settings-btn">Back to Profile</button>
            </div>
        </div>
    );
}

export default Settings;