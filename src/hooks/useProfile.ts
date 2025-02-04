import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const useProfile = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      console.log('Fetching profile for userId:', userId);
      
      if (!userId) {
        console.log('No userId provided, returning null');
        return null;
      }
      
      // First try to get existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
        throw fetchError;
      }
      
      // If profile exists, return it
      if (existingProfile) {
        console.log('Existing profile found:', existingProfile);
        return existingProfile as Profile;
      }
      
      // If no profile exists, create one
      console.log('No profile found, creating new profile for user:', userId);
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({ id: userId })
        .select()
        .maybeSingle();
        
      if (createError) {
        console.error('Error creating profile:', createError);
        throw createError;
      }
      
      console.log('New profile created:', newProfile);
      return newProfile as Profile;
    },
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      console.log('Updating profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, username })
        .select()
        .maybeSingle();
        
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      return data as Profile;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['profile', data.id] });
      }
    },
  });
};