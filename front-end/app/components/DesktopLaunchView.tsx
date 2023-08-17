import { YoutubeIcon } from '@/common/icons/youtubeIcon';
import { ILaunch } from '@/common/types/launch';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';

interface Props {
  data: ILaunch[];
}

function DesktopLaunchView({ data }: Props) {
  console.log({ data });

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nª Voo
            </th>
            <th scope="col" className="px-6 py-3">
              Logo
            </th>
            <th scope="col" className="px-6 py-3">
              Missão
            </th>
            <th scope="col" className="px-6 py-3">
              Data de lançamento
            </th>
            <th scope="col" className="px-6 py-3">
              Foguete
            </th>
            <th scope="col" className="px-6 py-3">
              Resultado
            </th>
            <th scope="col" className="px-6 py-3">
              Vídeo
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length &&
            data.map((launch) => (
              <tr className="bg-white border-b" key={launch._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {launch.flightNumber}
                </th>
                <td className="px-6 py-4">
                  {launch.logo ? (
                    <Image
                      src={launch.logo}
                      alt={`Mission ${launch.missionName} logo`}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <p>-</p>
                  )}
                </td>
                <td className="px-6 py-4">{launch.missionName}</td>
                <td className="px-6 py-4">
                  {format(parseISO(launch.dateUtc), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">{launch.rocket.name}</td>
                <td className="px-6 py-4">
                  <p
                    className={`text-sm text-center text-gray-500 truncate w-20 py-1 ${
                      launch.result
                        ? 'bg-green-400 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {launch.result ? 'Sucesso' : 'Falha'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {launch.webcast ? (
                    <a href={launch.webcast} target="_blank" type="button">
                      <YoutubeIcon />
                    </a>
                  ) : (
                    <p>-</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DesktopLaunchView;
