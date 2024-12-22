import supabase from './supabase';

export async function fetchStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addStudent(student) {
  const { data, error } = await supabase
    .from('students')
    .insert([student])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateStudent(id, updates) {
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteStudent(id) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return id;
}
