import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 mt-1 text-red-600">
      <AlertTriangle className="h-4 w-4" />
      <p className="text-sm">{message}</p>
    </div>
  );
}