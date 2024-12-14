async function query(data) {
      const response = await fetch(
        "http://localhost:3000/api/v1/prediction/c9f0d579-415d-4c98-adaa-39f3338f9e45",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const result = await response.json();
      return result;
    }

    document.getElementById('send-button').addEventListener('click', async () => {
      const userInput = document.getElementById('user-input').value;
      if (!userInput) return;

      const chatWindow = document.getElementById('chat-window');

      // Display user message
      const userMessage = document.createElement('div');
      userMessage.className = 'message user';
      userMessage.textContent = userInput;
      chatWindow.appendChild(userMessage);

      // Clear input
      document.getElementById('user-input').value = '';

      // Show loading indicator
      const loadingIndicator = document.getElementById('loading-indicator');
      loadingIndicator.classList.remove('hidden');

      try {
        // Query the API
        const response = await query({ "question": userInput });

        // Display AI response
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai';
        aiMessage.textContent = response.answer; // Adjust based on API response structure
        chatWindow.appendChild(aiMessage);
      } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message error';
        errorMessage.textContent = 'Error: ' + error.message;
        chatWindow.appendChild(errorMessage);
      } finally {
        // Hide loading indicator
        loadingIndicator.classList.add('hidden');
        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    });
