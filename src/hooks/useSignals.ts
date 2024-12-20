import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export type Signal = {
  id: string;
  name: string;
  indicator: "RSI" | "MACD" | "BOLLINGER_BANDS" | "EMA";
  condition: "ABOVE" | "BELOW" | "CROSS_ABOVE" | "CROSS_BELOW";
  value: number;
  token_symbol: string;
  is_active: boolean;
  confidence_score: number;
  created_at: string;
};

export const useSignals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch signals
  const { data: signals = [], isLoading } = useQuery({
    queryKey: ["signals"],
    queryFn: async () => {
      console.log("Fetching signals...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("signals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching signals:", error);
        throw error;
      }

      console.log("Fetched signals:", data);
      return data as Signal[];
    },
  });

  // Create signal
  const createSignal = useMutation({
    mutationFn: async (signal: Omit<Signal, "id" | "created_at">) => {
      console.log("Creating signal:", signal);
      const { data, error } = await supabase
        .from("signals")
        .insert(signal)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signals"] });
      toast({
        title: "Signal Created",
        description: "Your signal has been created successfully.",
      });
    },
  });

  // Delete signal
  const deleteSignal = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting signal:", id);
      const { error } = await supabase
        .from("signals")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signals"] });
      toast({
        title: "Signal Deleted",
        description: "Your signal has been deleted successfully.",
      });
    },
  });

  // Update signal
  const updateSignal = useMutation({
    mutationFn: async ({ id, ...signal }: Partial<Signal> & { id: string }) => {
      console.log("Updating signal:", { id, signal });
      const { data, error } = await supabase
        .from("signals")
        .update(signal)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signals"] });
      toast({
        title: "Signal Updated",
        description: "Your signal has been updated successfully.",
      });
    },
  });

  // Real-time updates
  useEffect(() => {
    console.log("Setting up real-time subscription for signals...");
    const channel = supabase
      .channel("signals-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "signals",
        },
        (payload) => {
          console.log("Real-time signal update received:", payload);
          queryClient.invalidateQueries({ queryKey: ["signals"] });
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up signals subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    signals,
    isLoading,
    createSignal,
    deleteSignal,
    updateSignal,
  };
};