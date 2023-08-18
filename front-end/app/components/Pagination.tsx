'use client';

import { ArrowLeft } from '@/common/icons/arrowLeft';
import { ArrowRight } from '@/common/icons/arrowRight';
import { IPaginationData } from '@/common/types/paginationData';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {
  pagination: IPaginationData;
}

function Pagination({ pagination }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleNextPage = () => {
    const queryParams = new URLSearchParams({
      search: params.get('search') || '',
      page: (pagination.page + 1).toString(),
    });
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?${queryParams}`);
  };

  const handlePrevPage = () => {
    const queryParams = new URLSearchParams({
      search: params.get('search') || '',
      page: (pagination.page - 1).toString(),
    });
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?${queryParams}`);
  };

  return (
    <section className="flex flex-col items-center md:flex-row md:justify-end gap-2 mb-10">
      <div className="text-sm text-gray-700 dark:text-gray-400">
        Visualizando{' '}
        <span className="text-gray-900">{pagination.page * 5 - 4}</span> a{' '}
        <span className="text-gray-900">{pagination.page * 5}</span> de{' '}
        <span className="text-gray-900">{pagination.totalDocs}</span>{' '}
        Lançamentos
      </div>
      <div className="inline-flex">
        <button
          onClick={handlePrevPage}
          disabled={!pagination.hasPrev}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-700 rounded-l hover:bg-gray-100 ${
            !pagination.hasPrev && 'cursor-not-allowed text-gray-300'
          }`}
        >
          <ArrowLeft
            fill={!pagination.hasPrev ? 'rgb(209, 213, 219)' : 'rgb(55 65 81)'}
          />
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={!pagination.hasNext}
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-700 rounded-l hover:bg-gray-100 ${
            !pagination.hasNext && 'cursor-not-allowed text-gray-300'
          }`}
        >
          Próxima
          <ArrowRight
            fill={!pagination.hasNext ? 'rgb(209, 213, 219)' : 'rgb(55 65 81)'}
          />
        </button>
      </div>
    </section>
  );
}

export default Pagination;
