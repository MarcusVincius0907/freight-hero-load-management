import { toast } from '@/hooks/use-toast';
import { Load } from '@/types/load';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newLoad: Omit<Load, 'id'>) => ({
      ...newLoad,
      id: Date.now()
    }),
    onSuccess: (newLoad) => {
      queryClient.setQueryData<Load[]>(['loads'], (old = []) => [newLoad, ...old]);
      toast({ title: 'Load created successfully.' });
    },
    onError: () => {
      toast({ title: 'Failed to create load.' });
    }
  });
}

export function useUpdateLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedLoad: Load) => updatedLoad,
    onSuccess: (updatedLoad) => {
      queryClient.setQueryData<Load[]>(['loads'], (old = []) =>
        old.map((load) => (load.id === updatedLoad.id ? updatedLoad : load))
      );
      toast({ title: 'Load updated successfully.' });
    },
    onError: () => {
      toast({ title: 'Failed to update load.' });
    }
  });
}

export function useDeleteLoad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id: number) => {
      queryClient.setQueryData<Load[]>(['loads'], (old = []) => old.filter((load) => load.id !== id));
      toast({ title: 'Load deleted successfully.' });
    },
    onError: () => {
      toast({ title: 'Failed to delete load.' });
    }
  });
}
