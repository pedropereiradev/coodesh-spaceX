'use client';

import { CloseIcon } from '@/common/icons/closeIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useCallback, useState } from 'react';

function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState('');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const queryParams = new URLSearchParams({
        page: params.get('page') || '1',
        search,
      });

      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?${queryParams}`);

      setSearch('')
    },
    [params, router, search]
  );

  const handleClearSearch = () => {
    const queryParams = new URLSearchParams({
      page: '1',
      search: '',
    });

    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?${queryParams}`);
  };

  return (
    <>
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only">
          Buscar
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Digite a missão a ser buscada"
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-30"
        >
          Buscar
        </button>
      </form>
      {params.get('search') && (
        <div
          id="searchedTerm"
          className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded mt-2"
        >
          {params.get('search')}
          <button
            onClick={handleClearSearch}
            type="button"
            className="inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
            data-dismiss-target="#searchedTerm"
            aria-label="Remove"
          >
            <CloseIcon />
            <span className="sr-only">Remove badge</span>
          </button>
        </div>
      )}
    </>
  );
}

export default SearchBar;
