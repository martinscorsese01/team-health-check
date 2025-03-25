'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HealthCheck } from '@/lib/supabase';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  feeling: z.string().min(1, 'Feeling is required'),
  date: z.string().refine((date) => {
    try {
      new Date(date).toISOString();
      return true;
    } catch {
      return false;
    }
  }, 'Invalid date format'),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 16),
    },
  });

  useEffect(() => {
    fetchHealthChecks();
  }, []);

  const fetchHealthChecks = async () => {
    try {
      const response = await fetch('/api/health-checks');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch health checks');
      }
      const data = await response.json();
      setHealthChecks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load health checks');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/health-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: new Date(data.date).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit health check');
      }

      const newHealthCheck = await response.json();
      setHealthChecks((prev) => [newHealthCheck, ...prev]);
      reset();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit health check');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-8 text-center">Team Health Check</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      {...register('name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">How are you feeling?</label>
                    <select
                      {...register('feeling')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a feeling</option>
                      <option value="Great">Great</option>
                      <option value="Good">Good</option>
                      <option value="Okay">Okay</option>
                      <option value="Not Great">Not Great</option>
                      <option value="Bad">Bad</option>
                    </select>
                    {errors.feeling && (
                      <p className="mt-1 text-sm text-red-600">{errors.feeling.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="datetime-local"
                      {...register('date')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Health Check'}
                  </button>
                </form>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Recent Health Checks</h2>
                  <div className="space-y-4">
                    {healthChecks.map((check) => (
                      <div
                        key={check.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{check.name}</p>
                            <p className="text-sm text-gray-600">
                              Feeling: {check.feeling}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(check.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 