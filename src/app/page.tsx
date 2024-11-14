'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface IMake {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}
export default function Home() {
  const [makes, setMakes] = useState([] as IMake[]);
  const [selectedMake, setSelectedMake] = useState('' as string);
  const [selectedYear, setSelectedYear] = useState('' as string);
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
  });

  useEffect(() => {
    fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    )
      .then((response) => response.json())
      .then((data) => setMakes(data.Results || []))
      .catch((error) => console.error('Error fetching makes:', error));
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gradient-to-b from-blue-500 to-purple-700 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Car</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3 max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Choose Your Car
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-white">Choose type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded bg-black text-white"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Choose type</option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-white">Choose year</label>
            <select
              className="w-full p-2 border border-gray-300 rounded bg-black text-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Choose year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <Link
            href={
              selectedMake && selectedYear
                ? `/result/${selectedMake}/${selectedYear}`
                : '#'
            }
            passHref
          >
            <button
              className={`w-full py-2 rounded ${
                !selectedMake || !selectedYear
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white'
              }`}
              disabled={!selectedMake || !selectedYear}
            >
              Confirm Selection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
