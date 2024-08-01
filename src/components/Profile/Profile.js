import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from './functions/logout_func.js';
import { handleSubmit } from './functions/create_new_prompt.js';
import { getPromptBoxes } from './functions/get_prompts.js';
import { handlePromptClick } from './functions/update_prompt.js';
import { updatePromptOrder } from './functions/update_prompt_order.js';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Recorder from './Recorder.js'; // Make sure this is the correct path



function SubmitPrompt() {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const token = localStorage.getItem('access_token');
  const [promptBoxes, setPromptBoxes] = useState([]);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [createnewPrompt, setnewPrompt] = useState(false);


  useEffect(() => {
    if (createnewPrompt) {
      getPromptBoxes(token, setPromptBoxes, navigate)
      setnewPrompt(false); // Reset after the effects have been handled
    }
  // eslint-disable-next-line
  }, [createnewPrompt]);
  
  useEffect(() => {
  
    setTimeout(() => {
      setShowMessage(false); // Reset the showMessage state after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds

  // eslint-disable-next-line
  }, [showMessage]);
  

  useEffect(() => {
    getPromptBoxes(token, setPromptBoxes, navigate);
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Check if promptBoxes have been loaded and contain items before attempting to update
    if (promptBoxes.length > 0) {
      updatePromptOrder(promptBoxes, token).catch(console.error);
    }
  // eslint-disable-next-line
  } , [promptBoxes]); 



  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
        return;
    }

    const startBox = promptBoxes.find(box => `box-${box.id}` === source.droppableId);
    const finishBox = promptBoxes.find(box => `box-${box.id}` === destination.droppableId);

    const movedPrompt = startBox.prompts[source.index];
    startBox.prompts.splice(source.index, 1);
    if (startBox === finishBox) {
        startBox.prompts.splice(destination.index, 0, movedPrompt);
    } else {
        finishBox.prompts.splice(destination.index, 0, movedPrompt);
    }

    setPromptBoxes([...promptBoxes]);  // Trigger a state update without trying to call a callback
};

  const handleEditClick = (prompt) => {
    setEditingPrompt(prompt.id);
    setEditingText(prompt.text);
  };


  const handleSaveClick = async (promptId) => {
    await handlePromptClick({ id: promptId, text: editingText }, setMessage, setShowMessage, navigate);
    const newPromptBoxes = promptBoxes.map(box => {
      const prompts = box.prompts.map(p => {
        if (p.id === promptId) {
          return { ...p, text: editingText };
        }
        return p;
      });
      return { ...box, prompts };
    });
    setPromptBoxes(newPromptBoxes);
    setEditingPrompt(null);
    setEditingText('');
  };

  return (
    <div>
      <div className="header">
        <button onClick={() => handleLogout(navigate)} className="logout-btn">Logout</button>
        <button onClick={() =>  navigate('/settings')} className="settings-btn">Settings</button>
      </div>
      <div class="row">
        <form onSubmit={(event) => handleSubmit(event, text, token, setMessage, setShowMessage, navigate, setnewPrompt)}>
          <label>
            Enter your prompt:
            <textarea value={text} onChange={e => setText(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
        
        < Recorder />  {/* Embedded Settings component */}
      </div>
     
      {showMessage && <div className="info-message">{message}</div>}
      <DragDropContext onDragEnd={handleDragEnd}>
  <div className="prompt-boxes-container">
    {[...promptBoxes].reverse().map((box) => (
      <Droppable key={box.id} droppableId={`box-${box.id}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="prompt-box">
            <h2>{box.creationDate}</h2>
            {box.prompts.map((prompt, index) => (
              <Draggable key={prompt.id} draggableId={`prompt-${prompt.id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="prompt-container">
                    {editingPrompt === prompt.id ? (
                      <>
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button onClick={() => handleSaveClick(prompt.id)}>Save</button>
                      </>
                    ) : (
                      <>
                        {prompt.text}
                        <button onClick={() => handleEditClick(prompt)}>Edit</button>
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ))}
  </div>
</DragDropContext>
    </div>
  );
}

export default SubmitPrompt;