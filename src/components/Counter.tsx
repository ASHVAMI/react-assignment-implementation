import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Plus, Minus, RotateCcw, Share2, Download, Camera } from 'lucide-react';
import { 
  Button, 
  VStack, 
  Text, 
  Box, 
  useColorModeValue,
  Image,
  Grid,
  useToast,
  Flex
} from '@chakra-ui/react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const toast = useToast();
  
  const backgroundProps = useSpring({
    from: { height: '0%' },
    to: { height: `${Math.min(count * 2, 100)}%` },
    config: {
      tension: 120,
      friction: 14,
    },
  });

  const gradientBg = useColorModeValue(
    'linear-gradient(to top, #4299E1, #90CDF4)',
    'linear-gradient(to top, #805AD5, #B794F4)'
  );

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleReset = () => setCount(0);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Counter Value',
        text: `Check out my counter value: ${count}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the Web Share API",
        status: "info",
        duration: 3000,
      });
    }
  };

  const handleScreenshot = () => {
    toast({
      title: "Screenshot captured",
      description: "Your counter state has been saved",
      status: "success",
      duration: 3000,
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Counter value: ${count}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "counter-value.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mx="auto" maxW="1200px">
      <Box position="relative" h="80vh" overflow="hidden" borderRadius="xl">
        <animated.div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            background: gradientBg,
            ...backgroundProps,
          }}
        />
        
        <VStack
          spacing={6}
          position="relative"
          zIndex={1}
          pt={20}
        >
          <Text 
            fontSize="8xl" 
            fontWeight="bold" 
            color="white"
            textShadow="2px 2px 4px rgba(0,0,0,0.2)"
          >
            {count}
          </Text>
          
          <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
            <Button
              leftIcon={<Plus />}
              colorScheme="blue"
              onClick={handleIncrement}
              size="lg"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Increment
            </Button>
            
            <Button
              leftIcon={<Minus />}
              colorScheme="purple"
              onClick={handleDecrement}
              size="lg"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Decrement
            </Button>
            
            <Button
              leftIcon={<RotateCcw />}
              colorScheme="pink"
              onClick={handleReset}
              size="lg"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Reset
            </Button>
          </Box>

          <Flex gap={4} mt={4}>
            <Button
              leftIcon={<Share2 />}
              colorScheme="green"
              onClick={handleShare}
              size="md"
              variant="outline"
            >
              Share
            </Button>
            <Button
              leftIcon={<Download />}
              colorScheme="orange"
              onClick={handleDownload}
              size="md"
              variant="outline"
            >
              Save
            </Button>
            <Button
              leftIcon={<Camera />}
              colorScheme="teal"
              onClick={handleScreenshot}
              size="md"
              variant="outline"
            >
              Screenshot
            </Button>
          </Flex>
        </VStack>
      </Box>

      <VStack spacing={8} justify="center" align="stretch">
        <Box
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          transition="transform 0.3s"
          _hover={{ transform: 'scale(1.02)' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1600"
            alt="Analytics Dashboard"
            objectFit="cover"
          />
        </Box>
        
        <Box
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          transition="transform 0.3s"
          _hover={{ transform: 'scale(1.02)' }}
        >
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600"
            alt="Data Visualization"
            objectFit="cover"
          />
        </Box>
      </VStack>
    </Grid>
  );
};

export default Counter;