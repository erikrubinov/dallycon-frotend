import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactMediaRecorder } from 'react-media-recorder';
import './Settings.css'; // Make sure to create this CSS file
import { BsFillPauseFill} from  "react-icons/bs";
import { VscDebugContinueSmall } from "react-icons/vsc";
import { CiStop1 } from "react-icons/ci";
import { GrMicrophone } from "react-icons/gr";


function Settings() {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [mediaUrl, setSavedRecording] = useState(null);

    async function uploadRecording() {
        const token = localStorage.getItem('access_token');
        setSavedRecording(mediaUrl);
        console.log(mediaUrl)
        if (!mediaUrl) {
            alert('No recording available to upload!');
            return;
        }
    
        try {

            const response = await fetch(mediaUrl);
            const blob = await response.blob(); // Convert the blob URL to a file-like Blob object
        
            const formData = new FormData();
            formData.append('file', blob, 'recording.wav'); 
            
         
            const uploadResponse = await fetch('http://localhost:8000/fetch_recording', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (uploadResponse.ok) {
                const result = await uploadResponse.json(); // Assuming the server responds with JSON
                alert('Upload successful!');
                console.log('Server response:', result);
            } else {
                throw new Error('Failed to upload recording');
            }
        } catch (error) {
            console.error('Error uploading recording:', error);
            alert('Error uploading recording: ' + error.message);
        }
    }

    const downloadRecording = () => {
        if (!mediaUrl) {
            alert("No recording available to download!");
            return;
        }
    
        fetch(mediaUrl)
            .then(res => res.blob())
            .then(blob => {
                const mimeType = blob.type;
                const fileExtension = mimeType.split('/')[1] || 'mp3'; // Default to 'mp3' if the type is unknown
                const fileName = `recording.${fileExtension}`;
    
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', fileName);
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };
    


    const delete_record = () => {
        setSavedRecording(null);
        console.log(mediaUrl)
    };

    return (
        <div>
            <div className="header">
                <button onClick={() => navigate('/profile')} className="settings-btn">Back to Profile</button>
            </div>
            <div className= "settings">
            <div className="recorder-container">
                <ReactMediaRecorder
                    audio
                    onStop={(blobUrl) => {console.log("Recording stopped. URL:", blobUrl); setSavedRecording(blobUrl)}}
                    render={({ startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl }) => (
                        <div className="controls">
                            <p>{isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Not Recording!'}</p>
                            {!isRecording && (
                                <button className="record-btn" onClick={() => {
                                    startRecording();
                                    setIsRecording(true);
                                    setIsPaused(false);
                                }}><i className="fas fa-microphone"></i>
                                <GrMicrophone />
                                </button>
                            )}
                            {isRecording && !isPaused && (
                                <div>
                                    <button className="pause-btn" onClick={() => {
                                        pauseRecording();
                                        setIsPaused(true);
                                    }}><i className="fas fa-pause"></i>
                                    <BsFillPauseFill />
                                    </button>
                                    <button className="stop-btn" onClick={() => {
                                        stopRecording();
                                        setIsRecording(false);
                                        setIsPaused(false);
                                    }}><i className="fas fa-stop"></i>
                                     <CiStop1/>
                                    </button>
                                </div>
                            )}
                            {isRecording && isPaused && (
                                <div>
                                    <button className="resume-btn" onClick={() => {
                                        resumeRecording();
                                        setIsPaused(false);
                                    }}><i className="fas fa-play"></i>
                                    <VscDebugContinueSmall/>
                                    </button>
                                    <button className="stop-btn" onClick={() => {
                                        stopRecording();
                                        setIsRecording(false);
                                        setIsPaused(false);
                                    }}><i className="fas fa-stop"></i>
                                     <CiStop1/>
                                    </button>
                                </div>
                            )}
                            {mediaUrl && !isRecording &&
                          
                                   <audio src={mediaBlobUrl} controls />
                            
                            }
                           {mediaUrl && !isRecording && (
                            <div>
                                <button className="save-btn" onClick={uploadRecording}>Upload</button>
                                <button className="delete_button" onClick={delete_record}>Delete</button>
                                <button className="download-btn" onClick={downloadRecording}>Download</button>
                            </div>
                        )}
                        </div>
                    )}
                />
            </div>
        </div>
        </div>
    );
}

export default Settings;