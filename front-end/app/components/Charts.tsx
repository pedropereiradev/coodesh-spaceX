'use client';

import { ILaunchesByRocket, ILaunchesByYear } from '@/common/types/stats';
import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  launchesByYear: ILaunchesByYear[];
  launchesByRocket: ILaunchesByRocket[];
}

function Charts({ launchesByRocket, launchesByYear }: Props) {
  const rocketColors = {
    'Falcon 1': '#0088FE',
    'Falcon 9': '#00C49F',
    'Falcon Heavy': '#FFBB28',
    Starship: '#AEFB45',
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const formattedLaunchesByYear = useMemo(() => {
    return launchesByYear.map((item) => {
      return item.rockets.reduce(
        (acc, rocket) => ({
          ...acc,
          year: item.year,
          [rocket.rocket]: rocket.count,
        }),
        {}
      );
    });
  }, [launchesByYear]);

  return (
    <section className="min-w-full flex-col gap-5 flex items-center md:flex-row md:justify-around py-5">
      <section>
        <h2 className="mb-2 font-medium text-gray-900 text-center">
          Lançamentos de foguetes
        </h2>
        <PieChart width={300} height={300}>
          <Pie
            data={launchesByRocket}
            dataKey="count"
            nameKey="rocket"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderCustomizedLabel}
            fill="#8884d8"
          >
            {launchesByRocket.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={rocketColors[entry.rocket]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </section>
      <section>
        <h2 className="mb-2 font-medium text-gray-900 text-center">
          Lançamentos por ano
        </h2> 
        <BarChart
          width={300}
          height={300}
          data={formattedLaunchesByYear}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Falcon 1" stackId="a" fill={rocketColors['Falcon 1']} />
          <Bar dataKey="Falcon 9" stackId="a" fill={rocketColors['Falcon 9']} />
          <Bar
            dataKey="Falcon Heavy"
            stackId="a"
            fill={rocketColors['Falcon Heavy']}
          />
          <Bar dataKey="Starship" stackId="a" fill={rocketColors['Starship']} />
        </BarChart>
      </section>
    </section>
  );
}

export default Charts;
