
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import PageBackground from '@/components/ui/PageBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/services/api';
import ProfileForm from '@/components/settings/ProfileForm';
import PasswordForm from '@/components/settings/PasswordForm';

const UserSettings = () => {
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle updating user profile
  const handleUpdateProfile = async (data: { phone: string }) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to update your profile');
      navigate('/auth');
      return;
    }
    
    setIsLoading(true);
    try {
      const updatedUser = await api.updateProfile({ phone: data.phone });
      login(updatedUser); // Update user in auth state
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle changing password
  const handleChangePassword = async (data: { currentPassword: string; newPassword: string }) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to change your password');
      navigate('/auth');
      return;
    }
    
    setIsLoading(true);
    try {
      await api.changePassword(data.currentPassword, data.newPassword);
      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageBackground variant="dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col"
      >
        <NavBar />

        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-guardian-darkGray">Account Settings</h1>
              <p className="text-guardian-gray mt-2">Manage your profile and security settings</p>
            </motion.div>
            
            <Card>
              <Tabs defaultValue="profile" className="w-full">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <TabsContent value="profile" className="space-y-4">
                    <CardDescription>
                      Update your personal information below
                    </CardDescription>
                    
                    <ProfileForm
                      user={user}
                      onSubmit={handleUpdateProfile}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-4">
                    <CardDescription>
                      Modify your password to keep your account secure
                    </CardDescription>
                    
                    <PasswordForm
                      onSubmit={handleChangePassword}
                      isLoading={isLoading}
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </main>

        <Footer />
      </motion.div>
    </PageBackground>
  );
};

export default UserSettings;
