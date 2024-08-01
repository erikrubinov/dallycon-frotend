import React, {useState} from 'react';
import './Settings.css';
import { useNavigate } from 'react-router-dom';




function Settings() {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    // Function to handle changes to the input
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    

    return (
        <div>
            <div className="header">
                <button onClick={() => navigate('/profile')} className="settings-btn">Back to Profile</button>
            </div>

        <div className="create_prompt_container">
        <input 
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="here write something"
        />
        </div>

            
     </div>
    );
}

export default Settings;