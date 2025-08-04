import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Program {
  id: string;
  name: string;
  type: 'undergraduate' | 'postgraduate';
  specializations: string[];
  semesters: number;
  created_at: string;
}

export interface Resource {
  id: string;
  program_id: string;
  semester: number;
  title: string;
  type: 'previous_year_papers' | 'study_material' | 'syllabus';
  file_url: string;
  file_size?: string;
  upload_date: string;
  uploaded_by?: string;
  created_at: string;
  program?: Program;
}

export interface Download {
  id: string;
  resource_id: string;
  downloaded_at: string;
  ip_address?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Programs functions
export const getPrograms = async () => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('type', { ascending: true })
    .order('name', { ascending: true });
  
  return { data, error };
};

// Resources functions
export const getResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select(`
      *,
      program:programs(*)
    `)
    .order('upload_date', { ascending: false });
  
  return { data, error };
};

export const getResourcesByProgram = async (programId: string, semester?: number) => {
  let query = supabase
    .from('resources')
    .select(`
      *,
      program:programs(*)
    `)
    .eq('program_id', programId);
  
  if (semester) {
    query = query.eq('semester', semester);
  }
  
  const { data, error } = await query.order('upload_date', { ascending: false });
  return { data, error };
};

export const uploadResource = async (resource: Omit<Resource, 'id' | 'created_at' | 'upload_date'>) => {
  const { data, error } = await supabase
    .from('resources')
    .insert([resource])
    .select()
    .single();
  
  return { data, error };
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);
  
  return { error };
};

// File upload function
export const uploadFile = async (file: File, bucket: string = 'resources') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    return { data: null, error };
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { data: { path: filePath, publicUrl }, error: null };
};

// Downloads functions
export const recordDownload = async (resourceId: string, ipAddress?: string) => {
  const { data, error } = await supabase
    .from('downloads')
    .insert([{ resource_id: resourceId, ip_address: ipAddress }])
    .select()
    .single();
  
  return { data, error };
};

export const getDownloadStats = async () => {
  const { data, error } = await supabase
    .from('downloads')
    .select('id, downloaded_at, resource:resources(title, type)')
    .order('downloaded_at', { ascending: false })
    .limit(10);
  
  return { data, error };
};

// Contact messages functions
export const submitContactMessage = async (message: Omit<ContactMessage, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
    .single();
  
  return { data, error };
};

export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Dashboard stats
export const getDashboardStats = async () => {
  const [programsResult, resourcesResult, downloadsResult, messagesResult] = await Promise.all([
    supabase.from('programs').select('id', { count: 'exact' }),
    supabase.from('resources').select('id', { count: 'exact' }),
    supabase.from('downloads').select('id', { count: 'exact' }),
    supabase.from('contact_messages').select('id', { count: 'exact' })
  ]);

  return {
    programs: programsResult.count || 0,
    resources: resourcesResult.count || 0,
    downloads: downloadsResult.count || 0,
    messages: messagesResult.count || 0
  };
};