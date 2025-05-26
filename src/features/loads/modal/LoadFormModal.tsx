import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';

const loadSchema = z.object({
  client_name: z.string().min(1),
  carrier_name: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  status: z.string().min(1)
});

export type LoadFormValues = z.infer<typeof loadSchema>;

type LoadFormModalProps = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<LoadFormValues>;
  onSubmit: (values: LoadFormValues) => void;
};

export default function LoadFormModal({ open, onClose, initialData, onSubmit }: LoadFormModalProps) {
    
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<LoadFormValues>({
    resolver: zodResolver(loadSchema),
    defaultValues: initialData || {
      client_name: '',
      carrier_name: '',
      origin: '',
      destination: '',
      status: ''
    }
  });


  useEffect(() => {
    
    reset(
        initialData || {
        client_name: "",
        carrier_name: "",
        origin: "",
        destination: "",
        status: "",
        }
    )
      
  }, [initialData, open]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const status = watch('status');

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Load' : 'Create Load'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Client Name</Label>
            <Input {...register('client_name')} placeholder="Client name" />
            {errors.client_name && <p className="text-red-500 text-sm">{errors.client_name.message}</p>}
          </div>

          <div>
            <Label>Carrier Name</Label>
            <Input {...register('carrier_name')} placeholder="Carrier name" />
            {errors.carrier_name && <p className="text-red-500 text-sm">{errors.carrier_name.message}</p>}
          </div>

          <div>
            <Label>Origin</Label>
            <Input {...register('origin')} placeholder="Origin" />
            {errors.origin && <p className="text-red-500 text-sm">{errors.origin.message}</p>}
          </div>

          <div>
            <Label>Destination</Label>
            <Input {...register('destination')} placeholder="Destination" />
            {errors.destination && <p className="text-red-500 text-sm">{errors.destination.message}</p>}
          </div>

          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(val) => setValue('status', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in route">In Route</SelectItem>
                <SelectItem value="pick up">Pick Up</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
