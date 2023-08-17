import { ILaunches } from '@/common/types/launch';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import MobileLaunchView from './components/MobileLaunchView';
import DesktopLaunchView from './components/DesktopLaunchView';

export default async function Home({ searchParams }) {
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

  const launchData = await getLaunches();

  return (
    <main className="">
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
