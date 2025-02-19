import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Button, useColorMode } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Sun, Moon, Home, UserCircle, FileEdit, LayoutDashboard } from 'lucide-react';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex 
      as="nav" 
      align="center" 
      justify="space-between" 
      padding="1rem" 
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex gap={4}>
        <Link to="/">
          <Button leftIcon={<Home size={20} />} variant="ghost">
            Home
          </Button>
        </Link>
        <Link to="/form">
          <Button leftIcon={<UserCircle size={20} />} variant="ghost">
            User Form
          </Button>
        </Link>
        <Link to="/editor">
          <Button leftIcon={<FileEdit size={20} />} variant="ghost">
            Editor
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button leftIcon={<LayoutDashboard size={20} />} variant="ghost">
            Dashboard
          </Button>
        </Link>
      </Flex>
      <Button onClick={toggleColorMode} variant="ghost">
        {colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </Button>
    </Flex>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
            <NavBar />
            <Box p={4}>
              <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/form" element={<UserForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/editor" element={<RichTextEditor content="" onChange={() => {}} />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;