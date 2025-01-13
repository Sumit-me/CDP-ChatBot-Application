import axios from 'axios';
import { CDP } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
let API_KEY = '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';

export function setApiKey(newKey: string) {
  if (newKey && newKey.trim()) {
    API_KEY = newKey.trim();
    localStorage.setItem('openai_api_key', API_KEY);
  }
}

// Initialize API key from localStorage if available
if (typeof window !== 'undefined') {
  const storedKey = localStorage.getItem('openai_api_key');
  if (storedKey) {
    API_KEY = storedKey;
  }
}

export async function validateApiKey(apiKey: string) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Test' }],
        max_tokens: 5
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data && response.data.choices) {
      return { valid: true, message: 'API key is valid' };
    }
    return { valid: false, message: 'Invalid API response format' };
  } catch (error: any) {
    const message = error.response?.data?.error?.message || 'Invalid API key';
    return { valid: false, message };
  }
}

export async function askQuestion(question: string, cdp: CDP) {
  try {
    const systemPrompt = cdp === 'all' 
      ? 'You are a helpful assistant for Customer Data Platforms (CDPs) including Segment, mParticle, Lytics, and Zeotap. Provide specific and practical answers.'
      : `You are a helpful assistant specifically for ${cdp.charAt(0).toUpperCase() + cdp.slice(1)} CDP. Focus on providing specific and practical answers for this platform.`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return {
      answer: response.data.choices[0].message.content
    };
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw new Error(error.response?.data?.error?.message || 'Failed to get response from OpenAI');
  }
}
