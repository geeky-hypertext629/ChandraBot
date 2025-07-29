"use client"
import React from 'react'
import { VapiWidget } from './chatbotConfigure';

const Chatbot = () => {
  const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  return (
    <VapiWidget 
      apiKey={apiKey!} 
      assistantId={assistantId!} 
    />
  )
}

export { Chatbot }
