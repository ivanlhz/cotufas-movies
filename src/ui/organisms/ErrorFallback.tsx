import { Button } from '@/components/ui/button';
import { FallbackProps } from 'react-error-boundary';
import { ErrorIcon } from '../atoms/ErrorIcon';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg border border-red-200">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <ErrorIcon />
        </div>
        <h2 className="mt-2 text-xl font-semibold text-center text-gray-800">Algo salió mal</h2>
        <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-100">
          <p className="text-sm font-mono text-red-800 break-words">{error.message}</p>
        </div>
        <div className="mt-6">
          <Button
            onClick={resetErrorBoundary}
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Intentar nuevamente
          </Button>
        </div>
        <p className="mt-4 text-xs text-center text-gray-500">
          Si el problema persiste, por favor contacta al soporte técnico.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;