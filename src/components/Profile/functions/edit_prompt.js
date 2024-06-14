// In edit_prompt.js
export const handleSaveClick = async (promptId, editingText, promptBoxes, setPromptBoxes, handlePromptClick, setMessage, setShowMessage, navigate) => {
    // Now handlePromptClick is passed correctly and should not be undefined
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
};

// promptFunctions.js
export const handleEditClick = (prompt, setEditingPrompt, setEditingText) => {
    setEditingPrompt(prompt.id);
    setEditingText(prompt.text);
};