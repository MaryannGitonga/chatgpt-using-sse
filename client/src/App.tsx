import React, { useState } from 'react'
import './App.css'
import { Button, Card, Flex, Space, Typography, Input } from 'antd';

const { Text } = Typography;

const cardStyle: React.CSSProperties = {
  width: 620,
}

const smallComponentStyle: React.CSSProperties = {
  marginLeft: 5,
  marginBottom: 10,
  textAlign: 'left',
  display: 'block'
}

const inputStyle: React.CSSProperties = {
  width: '85%',
  marginBottom: 10
}

const App: React.FC = () => {
  const [ inputValue, setInputValue ] = useState<string>('');
  const [ prompt, setPrompt ] = useState<string>('');

  const handleSubmit = () => {
    setPrompt(inputValue);
    setInputValue('');
  }

  return (
    <Flex justify='center' align='center' style={{borderRadius: '20%'}}>
    <Card hoverable style={cardStyle} bodyStyle={{padding: 10, overflow:'hidden'}}>
      <Flex justify='space-between'>
        <Input 
          id='promptInput' 
          style={inputStyle} 
          placeholder='Message ChatGPT...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button 
          type='primary' 
          onClick={handleSubmit}
          disabled={inputValue.trim() === ''}
        >Submit</Button>
      </Flex>
      <Space direction="vertical">
        <Text id="promptText" style={smallComponentStyle}>
          <b>User:</b>
          <br/>
          {prompt}
        </Text>
        <Text id="responseText" style={smallComponentStyle}>
          <b>ChatGPT:</b> 
          <br/>
        This is a React sample web application making use of OpenAI's GPT-3
          API to perform prompt completions. Results are received using Server
          Sent Events (SSE) in real-time.
        </Text>
      </Space>
    </Card>
  </Flex>
  )
}

export default App
