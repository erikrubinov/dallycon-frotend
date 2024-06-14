export const updatePromptOrder = async (promptBoxes, token) => {
  const promptBoxOrders = promptBoxes.map(box => ({
      boxId: box.id,
      prompts: box.prompts.map((prompt, index) => ({ id: prompt.id, rank: index }))
  }));

  console.log("Sending updated orders to backend: ", promptBoxOrders);

  try {
      const response = await fetch('http://localhost:8000/updatePromptOrder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ promptBoxOrders })
      });

      if (!response.ok) {
          throw new Error('Failed to update prompt order');
      }

      const result = await response.json();
      console.log('Order update successful:', result);
  } catch (error) {
      console.error('Error updating order:', error);
  }
};