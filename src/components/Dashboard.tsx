import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Flex,
  Badge,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RootState } from '../store';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Generate mock data for the charts
  const chartData = userData.map((user, index) => ({
    name: user.name,
    interactions: Math.floor(Math.random() * 100),
    activity: Math.floor(Math.random() * 100),
    engagement: Math.floor(Math.random() * 100),
  }));

  const pieData = [
    { name: 'Active Users', value: 400 },
    { name: 'Inactive Users', value: 300 },
    { name: 'New Users', value: 200 },
    { name: 'Returning Users', value: 100 },
  ];

  const stats = {
    totalUsers: userData.length || 150,
    activeToday: Math.floor((userData.length || 150) * 0.7),
    newThisWeek: Math.floor((userData.length || 150) * 0.3),
    growthRate: '+23%',
  };

  const recentActivities = [
    { user: 'John Doe', action: 'Updated profile', time: '5 min ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
    { user: 'Jane Smith', action: 'Completed task', time: '10 min ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
    { user: 'Mike Johnson', action: 'Added comment', time: '15 min ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
  ];

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Dashboard Overview</Heading>
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300"
          alt="Dashboard Header"
          borderRadius="lg"
          w="300px"
          h="100px"
          objectFit="cover"
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat
          px={4}
          py={5}
          bg={bgColor}
          shadow="base"
          rounded="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="md">Total Users</StatLabel>
          <StatNumber fontSize="3xl">{stats.totalUsers}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {stats.growthRate}
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={bgColor}
          shadow="base"
          rounded="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="md">Active Today</StatLabel>
          <StatNumber fontSize="3xl">{stats.activeToday}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12%
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={bgColor}
          shadow="base"
          rounded="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="md">New This Week</StatLabel>
          <StatNumber fontSize="3xl">{stats.newThisWeek}</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            18%
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={bgColor}
          shadow="base"
          rounded="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <StatLabel fontSize="md">Engagement Rate</StatLabel>
          <StatNumber fontSize="3xl">67%</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            7%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading size="md" mb={4}>User Activity</Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="interactions"
                  stackId="1"
                  stroke="#4299E1"
                  fill="#4299E1"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="activity"
                  stackId="1"
                  stroke="#48BB78"
                  fill="#48BB78"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          shadow="md"
        >
          <Heading size="md" mb={4}>User Distribution</Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          border="1px"
          borderColor={borderColor}
          shadow="md"
          gridColumn={{ base: "auto", lg: "span 2" }}
        >
          <Heading size="md" mb={4}>Recent Activities</Heading>
          <VStack spacing={4} align="stretch">
            {recentActivities.map((activity, index) => (
              <Flex
                key={index}
                p={3}
                bg={useColorModeValue('gray.50', 'gray.700')}
                borderRadius="md"
                align="center"
              >
                <Avatar size="sm" src={activity.avatar} mr={3} />
                <Box flex="1">
                  <Text fontWeight="bold">{activity.user}</Text>
                  <Text fontSize="sm" color="gray.500">{activity.action}</Text>
                </Box>
                <Badge colorScheme="blue">{activity.time}</Badge>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;