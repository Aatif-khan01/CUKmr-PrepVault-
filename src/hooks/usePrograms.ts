import { useState, useEffect } from 'react';
import { Program, getPrograms } from '../lib/supabase';
import toast from 'react-hot-toast';

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data, error } = await getPrograms();
      
      if (error) {
        throw error;
      }
      
      setPrograms(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms
  };
};