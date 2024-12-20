import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";

export const AuthUI = () => {
  console.log("Rendering AuthUI component"); // Debug log
  
  return (
    <div className="w-full">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#00ff73',
                brandAccent: '#00cc5c',
                inputBackground: 'transparent',
                inputText: 'white',
                inputPlaceholder: 'darkgray',
              },
            },
          },
          className: {
            container: 'auth-container',
            button: 'auth-button',
            input: 'auth-input',
            label: 'text-white/70',
          },
        }}
        theme="dark"
        providers={[]}
      />
    </div>
  );
};