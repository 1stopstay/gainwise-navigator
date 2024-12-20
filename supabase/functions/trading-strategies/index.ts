import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { method } = req;
    const url = new URL(req.url);
    
    console.log(`Processing ${method} request`);

    // Create strategy
    if (method === 'POST') {
      const { token_symbol, purchase_price, profit_goal, user_id } = await req.json();
      
      if (!user_id) {
        throw new Error('User ID is required');
      }
      
      console.log('Creating strategy:', { token_symbol, purchase_price, profit_goal, user_id });

      const { data, error } = await supabase
        .from('trading_strategies')
        .insert({
          token_symbol,
          purchase_price,
          profit_goal,
          user_id,
        })
        .select()
        .single();

      if (error) throw error;
      
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Update strategy
    if (method === 'PUT') {
      const { id, token_symbol, purchase_price, profit_goal, status } = await req.json();
      
      if (!id) {
        throw new Error('Strategy ID is required');
      }
      
      console.log('Updating strategy:', { id, token_symbol, purchase_price, profit_goal, status });

      const { data, error } = await supabase
        .from('trading_strategies')
        .update({
          token_symbol,
          purchase_price,
          profit_goal,
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Delete strategy
    if (method === 'DELETE') {
      const { id } = await req.json();
      
      if (!id) {
        throw new Error('Strategy ID is required');
      }
      
      console.log('Deleting strategy:', id);
      
      const { error } = await supabase
        .from('trading_strategies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get strategies for user
    if (method === 'GET') {
      const userId = url.searchParams.get('userId');
      console.log('Fetching strategies for user:', userId);

      if (!userId) {
        throw new Error('User ID is required');
      }

      const { data, error } = await supabase
        .from('trading_strategies')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Unsupported method: ${method}`);

  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});