import axios from 'axios';

const API_URL = '/api';

/**
 * Send a message to the chatbot API
 * 
 * @param {string} message - The text message
 * @param {File|null} image - Optional image file
 * @param {Array} history - Conversation history
 * @returns {Promise<Object>} - The API response
 */
export const sendMessage = async (message, image = null, history = []) => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    
    if (image) {
      formData.append('image', image);
    }
    
    if (history.length > 0) {
      formData.append('conversation_history', JSON.stringify(history));
    }
    
    const response = await axios.post(`${API_URL}/chat`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Generate an image from a prompt
 * 
 * @param {string} prompt - The image generation prompt
 * @returns {Promise<Object>} - The API response with the generated image
 */
export const generateImage = async (prompt) => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    
    const response = await axios.post(`${API_URL}/generate-image`, formData);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
