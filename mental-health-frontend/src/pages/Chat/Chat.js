import { useState, useRef, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Avatar, List, ListItem, ListItemText, ListItemAvatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AuthContext from '../../contexts/AuthContext';
import chatService from '../../services/chat.service';

function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your mental health assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Send message to backend
      const response = await chatService.sendMessage(input, user.id, user.token);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding. Please try again later.", 
        sender: 'bot' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 'calc(100vh - 64px)',
      p: 2,
      maxWidth: 800,
      mx: 'auto'
    }}>
      <Typography variant="h4" gutterBottom>Chat Support</Typography>
      
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        mb: 2,
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 2
      }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ 
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {message.sender === 'bot' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
                </ListItemAvatar>
              )}
              <ListItemText
                primary={message.text}
                sx={{
                  bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                  p: 2,
                  borderRadius: 2,
                  maxWidth: '70%',
                  boxShadow: 1
                }}
              />
              {message.sender === 'user' && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
          {loading && (
            <ListItem sx={{ justifyContent: 'flex-start' }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>B</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<CircularProgress size={24} />}
                sx={{
                  bgcolor: 'background.paper',
                  p: 2,
                  borderRadius: 2,
                  maxWidth: '70%',
                  boxShadow: 1
                }}
              />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!input.trim() || loading}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;