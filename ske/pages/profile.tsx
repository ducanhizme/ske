import React, { useState } from 'react';
import { Layout } from '../src/components/common/layout/Layout';
import { Button, Card, Input } from '../src/components/ui';
import { useAuth } from '../src/context';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Software developer with a passion for creating awesome applications.',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Software developer with a passion for creating awesome applications.',
    });
    setIsEditing(false);
  };

  return (
    <Layout title="Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 capitalize">Role: {user?.role}</p>
            </div>
            <div className="space-x-2">
              {!isEditing ? (
                <Button 
                  variant="primary" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="success" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
              <Button variant="error" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Form */}
        <Card title="Profile Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <Card title="Account Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Button variant="secondary" size="small">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive email updates about your account</p>
              </div>
              <Button variant="secondary" size="small">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
              <Button variant="error" size="small">
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}