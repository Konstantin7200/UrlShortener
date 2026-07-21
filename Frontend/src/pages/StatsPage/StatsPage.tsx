import type { FC } from "react";
import type { userData } from "../../types";
import { useAppSelector, type RootStateType } from "../../store/store";

export const StatsPage = () => {
  const stats = useAppSelector((state: RootStateType) => state.stats.stats);

  const headers = [
    "Browser",
    "BrowserVersion",
    "Ip",
    "Os",
    "Region",
    "Visiting Date",
  ];

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Visitor Statistics
              </h1>
              <p className="text-gray-600 text-lg">
                Track your website visitors at a glance
              </p>
            </div>
            {stats.length > 0 && (
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="text-sm text-gray-500">Total Visitors</span>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.length}
                </p>
              </div>
            )}
          </div>
        </div>

        {stats.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No visitors yet
              </h3>
              <p className="text-gray-500 max-w-md">
                Visitor data will appear here once people start visiting your
                website.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      #
                    </th>
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {stats.map((data, index) => (
                    <UserDataCont key={index} data={data} index={index + 1} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface UserDataContProps {
  data: userData;
  index: number;
}

const UserDataCont: FC<UserDataContProps> = ({ data, index }) => {

  return (
    <tr
      className={index % 2 === 0 ?`bg-white hover:bg-blue-50 transition-colors duration-200`:"bg-gray-50 hover:bg-blue-50 transition-colors duration-200"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
        {index}
      </td>
      {Object.entries(data)
        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
        .map(([key, value]) => (
          <td
            key={key}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {value}
          </td>
        ))}
    </tr>
  );
};
