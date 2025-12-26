
import { useState, useCallback } from 'react';
import { chatCompletionStream } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { spanishStrings as strings } from '../i18n/strings';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const initializeChat = useCallback((name: string) => {
    setUserName(name);
    setMessages([
      {
        role: 'model',
        content: strings.chatInitialGreeting(name)
      }
    ]);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = { role: 'user', content: message };
    const currentHistory = [...messages, userMessage];
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
        const stream = chatCompletionStream(currentHistory, userName || undefined);
        
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', content: '' }]);

        for await (const chunk of stream) {
            modelResponse += chunk;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'model', content: modelResponse };
                return newMessages;
            });
        }
    } catch (e) {
      console.error("Chat Error:", e);
      setError(strings.chatErrorMessage);
      setMessages(prevMessages => [...prevMessages, { role: 'model', content: strings.chatErrorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, userName]);

  const addMessagePair = useCallback((userMessage: ChatMessage, modelMessage: ChatMessage) => {
    setMessages(prev => [...prev, userMessage, modelMessage]);
  }, []);

  return { messages, sendMessage, isLoading, error, addMessagePair, initializeChat };
};
