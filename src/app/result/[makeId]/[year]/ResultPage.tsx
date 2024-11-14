"use client";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import Loading from "./Loading";

async function fetchModels(makeId: number, year: string) {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();
  return data.Results || [];
}

interface ModelsListProps {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface ModelsListComponentProps {
  models: ModelsListProps[];
}

const ModelsList: React.FC<ModelsListComponentProps> = ({ models }) => (
  <div className="flex h-screen w-full p-5 box-border bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
    <div className="w-1/3 pr-5 h-full rounded-lg bg-gradient-to-r from-red-400 to-yellow-400 flex justify-center items-center text-center text-white text-2xl font-bold">
      <p>Your results are ready!</p>
    </div>
    <div className="w-2/3 bg-gray-100 rounded-lg p-5 shadow-lg flex flex-col justify-center items-center h-full">
      <h1 className="text-2xl mb-5 text-black">
        Models for {models.length > 0 ? models[0].Make_Name : ""}
      </h1>
      <ul className="list-none p-0">
        {models.length > 0 ? (
          models.map((model) => (
            <li
              key={model.Model_ID}
              className="py-2 border-b border-gray-300 text-lg text-gray-800"
            >
              {model.Model_Name}
            </li>
          ))
        ) : (
          <p>No models found.</p>
        )}
      </ul>
    </div>
  </div>
);

const ResultPage = () => {
  const { makeId, year } = useParams();

  return (
    <Suspense fallback={<Loading />}>
      <ResultPageWithData makeId={makeId as string} year={year as string} />
    </Suspense>
  );
};

const ResultPageWithData = async ({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) => {
  const models = await fetchModels(Number(makeId), year);
  return <ModelsList models={models as ModelsListProps[]} />;
};

export default ResultPage;
