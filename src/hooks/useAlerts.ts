import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type Alert = {
  id: string;
  user_id: string;
  name: string;
  symbol: string;
  indicator: string;
  condition: string;
  value: number;
  is_active: boolean;
  notification_preferences: {
    email: boolean;
    push: boolean;
  };
  last_triggered_at: string | null;
  created_at: string;
  updated_at: string;
};

export const useAlerts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch alerts
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      console.log("Fetching alerts...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
        throw error;
      }

      console.log("Fetched alerts:", data);
      return data as Alert[];
    },
  });

  // Create alert
  const createAlert = useMutation({
    mutationFn: async (alert: Omit<Alert, "id" | "created_at" | "updated_at" | "user_id" | "last_triggered_at">) => {
      console.log("Creating alert:", alert);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("alerts")
        .insert({ ...alert, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alert Created",
        description: "Your alert has been created successfully.",
      });
    },
  });

  // Delete alert
  const deleteAlert = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting alert:", id);
      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alert Deleted",
        description: "Your alert has been deleted successfully.",
      });
    },
  });

  // Update alert
  const updateAlert = useMutation({
    mutationFn: async ({ id, ...alert }: Partial<Alert> & { id: string }) => {
      console.log("Updating alert:", { id, alert });
      const { data, error } = await supabase
        .from("alerts")
        .update(alert)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alert Updated",
        description: "Your alert has been updated successfully.",
      });
    },
  });

  // Real-time updates
  useEffect(() => {
    console.log("Setting up real-time subscription for alerts...");
    const channel = supabase
      .channel("alerts-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "alerts",
        },
        (payload) => {
          console.log("Real-time alert update received:", payload);
          queryClient.invalidateQueries({ queryKey: ["alerts"] });
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up alerts subscription");
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return {
    alerts,
    isLoading,
    createAlert,
    deleteAlert,
    updateAlert,
  };
};