import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    console.log(`Processing ${method} request`);

    // For GET requests
    if (method === 'GET') {
      const { user_id } = await req.json().catch(() => ({}));
      
      console.log('GET request user_id:', user_id);
      
      if (!user_id) {
        throw new Error('User ID is required');
      }

      console.log('Fetching strategies for user:', user_id);
      
      const { data, error } = await supabase
        .from('trading_strategies')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For POST requests
    if (method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const { token_symbol, purchase_price, profit_goal, user_id } = body;
      
      console.log('POST request data:', { token_symbol, purchase_price, profit_goal, user_id });
      
      if (!user_id) {
        throw new Error('User ID is required');
      }

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

    // For DELETE requests
    if (method === 'DELETE') {
      const { id, user_id } = await req.json().catch(() => ({}));
      
      console.log('DELETE request data:', { id, user_id });
      
      if (!id || !user_id) {
        throw new Error('Strategy ID and User ID are required');
      }
      
      const { error } = await supabase
        .from('trading_strategies')
        .delete()
        .eq('id', id)
        .eq('user_id', user_id);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For PUT requests
    if (method === 'PUT') {
      const body = await req.json().catch(() => ({}));
      const { id, token_symbol, purchase_price, profit_goal, status, user_id } = body;
      
      console.log('PUT request data:', { id, token_symbol, purchase_price, profit_goal, status, user_id });
      
      if (!id || !user_id) {
        throw new Error('Strategy ID and User ID are required');
      }

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
        .eq('user_id', user_id)
        .select()
        .single();

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