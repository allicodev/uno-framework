import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/core/providers/service/users.service';

// Sample user data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Editor',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: '6',
    name: 'Diana Clark',
    email: 'diana.clark@example.com',
    role: 'Editor',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
  },
  {
    id: '7',
    name: 'Edward Martinez',
    email: 'edward.martinez@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
  },
  {
    id: '8',
    name: 'Fiona Lopez',
    email: 'fiona.lopez@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
  },
  {
    id: '9',
    name: 'George Wilson',
    email: 'george.wilson@example.com',
    role: 'Admin',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
  },
  {
    id: '10',
    name: 'Helen Moore',
    email: 'helen.moore@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
  },
  {
    id: '11',
    name: 'Ian Thomas',
    email: 'ian.thomas@example.com',
    role: 'Editor',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
  },
  {
    id: '12',
    name: 'Julia Lee',
    email: 'julia.lee@example.com',
    role: 'User',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if request is authenticated
  const authHeader = req.headers.authorization;
  const isAuthenticated = authHeader && authHeader.startsWith('Bearer ');
  
  // Get query parameters with defaults
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  // For GET requests to the /users endpoint
  if (req.method === 'GET') {
    // If requesting a specific user by ID
    if (req.query.id) {
      const userId = req.query.id as string;
      const user = users.find(u => u.id === userId);
      
      if (user) {
        return res.status(200).json({
          success: true,
          data: user,
          message: 'User retrieved successfully'
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }
    
    // Return paginated users list
    return res.status(200).json({
      success: true,
      data: paginatedUsers,
      meta: {
        total: users.length,
        page,
        limit
      },
      message: 'Users retrieved successfully'
    });
  }
  
  // For POST requests to create a new user
  if (req.method === 'POST') {
    // Check authentication for POST operations
    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    // Would normally validate and save the user data here
    // For this mock, we'll just return a success response
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        ...req.body,
        id: (users.length + 1).toString()
      }
    });
  }
  
  // Method not allowed for other HTTP methods
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
