'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { api, ApiError } from '@/lib/api';
import { Test, PaginationMeta, PaginatedResponse, TestDetailSection } from '@/types/tests';

export type NormalizedTest = Omit<
  Test,
  'originalPrice' | 'discountedPrice' | 'testsCount'
> & {
  id: string;
  originalPrice: number;
  discountedPrice: number;
  testsCount: number;
  details?: TestDetailSection[];
};

export interface TestContextType {
  tests: NormalizedTest[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getTestById: (id: string) => NormalizedTest | undefined;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

// Normalizes backend test into consistent format
export function normalizeTest(test: any): NormalizedTest {
  const originalPrice =
    test.originalPrice ||
    (test.discountedPrice
      ? Math.round(test.discountedPrice * 1.8)
      : Math.round(test.price * 1.8));
  const discountedPrice = test.discountedPrice || test.price;
  const testsCount =
    test.testsCount ||
    (test.details && Array.isArray(test.details)
      ? test.details.reduce(
          (acc: number, d: any) =>
            acc + (d.testsCount || (d.items ? d.items.length : 0)),
          0
        )
      : 1) ||
    1;

  return {
    ...test,
    id: test.slug || test._id || String(test.id || ''),
    _id: test._id || test.id || '',
    name: test.name,
    description: test.description || '',
    price: test.price || discountedPrice,
    originalPrice,
    discountedPrice,
    badge:
      test.badge ||
      (originalPrice > discountedPrice ? 'SPECIAL OFFER' : undefined),
    testsCount,
    popular: test.popular ?? true,
    category: test.category || 'Blood',
    fastingRequired: Boolean(test.fastingRequired),
    highlights:
      test.highlights && test.highlights.length > 0
        ? test.highlights
        : [
            'NABL Certified Lab Testing',
            'Free Doorstep Sample Pickup',
            'Doctor Consultation Included',
          ],
    reportTime: test.reportTime || '12-15 Hours',
    isAvailable: test.isAvailable ?? true,
    createdAt: test.createdAt || new Date().toISOString(),
    updatedAt: test.updatedAt || new Date().toISOString(),
  };
}

export function TestProvider({ children }: { children: ReactNode }) {
  const [tests, setTests] = useState<NormalizedTest[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Single fetch on mount for the whole application
  const fetchTests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get<PaginatedResponse<Test>>('/tests?limit=50', {
        skipAuth: true,
      });

      if (res && Array.isArray(res.data)) {
        setTests(res.data.map(normalizeTest));
        setMeta(res.meta || null);
      } else {
        setTests([]);
        setMeta(null);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof ApiError ? err.message : 'Failed to fetch medical tests';
      setError(msg);
      setTests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const getTestById = useCallback(
    (id: string) => {
      return tests.find((t) => t.id === id || t._id === id);
    },
    [tests]
  );

  return (
    <TestContext.Provider
      value={{
        tests,
        meta,
        isLoading,
        error,
        refetch: fetchTests,
        getTestById,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTests() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTests must be used within a TestProvider');
  }
  return context;
}

