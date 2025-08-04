import React from 'react';
import { Layout } from '../src/components/common/layout/Layout';
import { Button, Card, Table } from '../src/components/ui';
import type { TableColumn } from '../src/components/ui';
import { useAuth } from '../src/context';

// Mock data for demonstration
const mockStats = [
  { title: 'Total Users', value: '1,234', change: '+12%' },
  { title: 'Active Sessions', value: '567', change: '+5%' },
  { title: 'Revenue', value: '$12,345', change: '+8%' },
  { title: 'Conversion Rate', value: '3.2%', change: '-2%' },
];

const mockTableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', lastLogin: '2024-01-14' },
];

const tableColumns: TableColumn<typeof mockTableData[0]>[] = [
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'status', title: 'Status', render: (value: unknown) => {
    const status = value as string;
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    );
  }},
  { key: 'lastLogin', title: 'Last Login' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout title="Dashboard" showSidebar={true}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Guest'}!
          </h1>
          <p className="text-gray-600">
            Here&apos;s an overview of your application status.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <Card title="Recent Users">
          <div className="mb-4">
            <Button variant="primary">Add User</Button>
            <Button variant="secondary" className="ml-2">Export</Button>
          </div>
          <Table 
            columns={tableColumns}
            data={mockTableData}
          />
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" className="w-full">
              Create New User
            </Button>
            <Button variant="secondary" className="w-full">
              Generate Report
            </Button>
            <Button variant="success" className="w-full">
              Send Notifications
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}