import React, { useEffect, useState } from 'react'
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
  const [ response, setResponse ] = useState<string>('');

  useEffect(() => {
    if (prompt.trim() !== '') {
      const eventSource = new EventSource('http://localhost:8000/chatgpt?prompt=' + encodeURIComponent(prompt))

      eventSource.addEventListener('message', (event) => {
        const newData = event.data;
        setResponse((prevResponse) => prevResponse + newData);
      });

      return () => {
        eventSource.close();
      }
    }
  }, [prompt]);

  const handleSubmit = () => {
    setPrompt(inputValue);
    setInputValue('');
  }

  return (
    <Flex style={{borderRadius: '20%'}}>
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
        <Flex align='start'>
          <Space direction="vertical">
            <Text id="promptText" style={smallComponentStyle}>
              <b>User:</b>
              <br/>
              {prompt}
            </Text>
            <Text id="responseText" style={smallComponentStyle}>
              <b>ChatGPT:</b> 
              <br/>
              {response}
            </Text>
          </Space>
        </Flex>
      </Card>
    </Flex>
  )
}

export default App
