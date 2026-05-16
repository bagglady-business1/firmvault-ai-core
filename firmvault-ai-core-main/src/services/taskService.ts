// src/services/taskService.ts

import { supabase } from "@/lib/supabaseClient";
import { activityService } from "@/services/activityService";

const TABLE = "tasks";

export type TaskRecord = {
  id: string;
  firm_id?: string | null;
  matter_id?: string | null;
  title: string;
  description?: string | null;
  status?: string | null;
  priority?: string | null;
  due_date?: string | null;
  created_at?: string;
};

export const taskService = {
  async getAll(filters?: { matterId?: string }): Promise<TaskRecord[]> {
    let query = supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.matterId) {
      query = query.eq("matter_id", filters.matterId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading tasks:", error);
      return [];
    }

    return (data ?? []) as TaskRecord[];
  },

  async getById(id: string): Promise<TaskRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error loading task:", error);
      return null;
    }

    return data as TaskRecord | null;
  },

  async create(payload: Partial<TaskRecord>): Promise<TaskRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error);
      return null;
    }

    const task = data as TaskRecord;

    if (task.matter_id) {
      await activityService.logMatterActivity(
        task.matter_id,
        `Task added: ${task.title}`,
      );
    }

    return task;
  },

  async update(
    id: string,
    patch: Partial<TaskRecord>,
  ): Promise<TaskRecord | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error);
      return null;
    }

    const task = data as TaskRecord;

    if (task.matter_id) {
      await activityService.logMatterActivity(
        task.matter_id,
        patch.status === "completed"
          ? `Task completed: ${task.title}`
          : `Task updated: ${task.title}`,
      );
    }

    return task;
  },

  async remove(id: string): Promise<{ id: string } | null> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      return null;
    }

    return { id };
  },
};