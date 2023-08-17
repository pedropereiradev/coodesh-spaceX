import { YoutubeIcon } from '@/common/icons/youtubeIcon';
import { ILaunch } from '@/common/types/launch';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';

interface Props {
  data: ILaunch[];
}

function MobileLaunchView({ data }: Props) {
  return (
    <ul className="divide-y divide-gray-200 md:hidden mx-auto">
      {data.length &&
        data.map((launch) => (
          <li className="pb-4 md:pb-3" key={launch._id}>
            <div className="flex items-center space-x-4 pt-1">
              <div className="flex-shrink-0">
                {launch.logo && (
                  <Image
                    src={launch.logo}
                    alt={`Mission ${launch.missionName} logo`}
                    width={40}
                    height={40}
                  />
                )}
                <p className="text-sm font-medium text-gray-900 truncate text-center">
                  {launch.flightNumber}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {launch.missionName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {format(parseISO(launch.dateUtc), 'dd/MM/yyyy')}
                </p>
              </div>
              <div className="flex flex-col items-center text-base font-semibold text-gray-900">
                {launch.webcast && (
                  <a href={launch.webcast} target="_blank" type="button">
                    <YoutubeIcon />
                  </a>
                )}
                <p
                  className={`text-sm text-center text-gray-500 truncate w-20 py-1 ${
                    launch.result
                      ? 'bg-green-400 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {launch.result ? 'Sucesso' : 'Falha'}
                </p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default MobileLaunchView;
