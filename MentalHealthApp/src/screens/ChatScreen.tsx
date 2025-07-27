import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';
import {ChatMessage} from '../types';

const ChatScreen = ({navigation}: any) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your mental health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for sharing. I'm here to listen and support you. Can you tell me more about how you're feeling?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1500);
  };

  const renderMessage = ({item}: {item: ChatMessage}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Support</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
        />

        {loading && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Bot is typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim() || loading}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 4,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  messageText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  typingIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  typingText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.white,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: SIZES.medium,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});

export default ChatScreen;