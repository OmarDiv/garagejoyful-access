
import { useState, useEffect } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/hooks/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User | null;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading: boolean;
}

const ProfileForm = ({ user, onSubmit, isLoading }: ProfileFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: user?.phone || '',
    },
  });
  
  // Update form when user data changes
  useEffect(() => {
    if (user?.phone) {
      form.setValue('phone', user.phone);
    }
  }, [user, form]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used for parking notifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            'Update Profile'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
