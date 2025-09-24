import { supabase } from "./supabase";

export async function getCourses() {
  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("error courses:", error.message);
    return [];
  }

  return data || [];
}

export async function getCourseById(id: number) {
  return await supabase.from("courses").select("*").eq("id", id).single();
}

export async function deleteCourse(id: number) {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting course:", error.message);
    throw error;
  }
  return true;
}

export async function updateCourse(
  id: number,
  title: string,
  description: string
) {
  const { data, error } = await supabase
    .from("courses")
    .update({ title, description })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating course:", error.message);
    throw error;
  }
  return data || [];
}

export async function addCourse(title: string, description: string) {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    throw new Error("Title cannot be empty");
  }

  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title: trimmedTitle,
        description: trimmedDescription,
      },
    ])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error adding course:", error.message);
    throw error;
  }

  return data;
}
