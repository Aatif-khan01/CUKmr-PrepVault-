import { useState, useEffect } from 'react';
import { Resource, getResources, getResourcesByProgram } from '../lib/supabase';
import toast from 'react-hot-toast';

export const useResources = (programId?: string, semester?: number) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      let result;
      
      if (programId) {
        result = await getResourcesByProgram(programId, semester);
      } else {
        result = await getResources();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      setResources(result.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [programId, semester]);

  return {
    resources,
    loading,
    error,
    refetch: fetchResources
  };
};