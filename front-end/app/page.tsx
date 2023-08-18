import { ILaunches } from '@/common/types/launch';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import MobileLaunchView from './components/MobileLaunchView';
import DesktopLaunchView from './components/DesktopLaunchView';
import { IStats } from '@/common/types/stats';
import dynamic from 'next/dynamic';

const Charts = dynamic(() => import('./components/Charts'), { ssr: false });

interface Props {
  searchParams: {
    search: string;
    page: string;
  };
}

export default async function Home({ searchParams }: Props) {
  async function getLaunches(): Promise<ILaunches> {
    try {
      const queryParams = new URLSearchParams({
        limit: '5',
        page: searchParams.page || '1',
        search: searchParams.search || '',
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/launch?${queryParams}`,
        { next: { revalidate: 3600 } }
      );

      return res.json();
    } catch (err) {
      console.log(err);
      return {} as ILaunches;
    }
  }

  async function getStats(): Promise<IStats> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/launch/stats`
      );

      return res.json();
    } catch (err) {
      console.log(err);
      return {} as IStats;
    }
  }

  const launchData = await getLaunches();
  const stats = await getStats();

  return (
    <main className="">
      <section className="container mx-auto">
        <Charts
          launchesByYear={stats.launchesByYear}
          launchesByRocket={stats.launchesByRocket}
        />
        <section className="flex flex-col items-center my-3 border rounded-md mx-auto py-4">
          <section className="text-gray-700">
            <h2 className="mb-2 font-medium text-gray-900">
              Resultado de Lançamento
            </h2>
            <p className="pl-2">
              Sucesso: <span className="text-green-400">{stats.success}</span>
            </p>
            <p className="pl-2">
              Falhas: <span className="text-red-400">{stats.failure}</span>
            </p>
          </section>
        </section>
      </section>
      <section className="container mx-auto px-4">
        <h2 className="mb-2 font-medium text-gray-900 text-center">
          Registro de Lançamentos
        </h2>
        <SearchBar />
        <section className="mt-5">
          <section className="block md:hidden">
            <MobileLaunchView
              data={launchData.result?.length ? launchData.result : []}
            />
          </section>
          <section className="hidden md:block">
            <DesktopLaunchView
              data={launchData.result?.length ? launchData.result : []}
            />
          </section>
        </section>
        <Pagination
          pagination={{
            hasNext: launchData.hasNext,
            hasPrev: launchData.hasPrev,
            page: launchData.page,
            totalDocs: launchData.totalDocs,
            totalPages: launchData.totalPages,
          }}
        />
      </section>
    </main>
  );
}
