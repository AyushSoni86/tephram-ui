import { useMemo } from "react";
import { electrolyzerIds } from "../data/data";
import { Search } from "lucide-react";

const ElectrolyzerList = ({
  selectedId,
  onSelect,
  searchTerm,
  onSearchChange,
}) => {
  const filteredIds = useMemo(() => {
    return electrolyzerIds.filter((id) => id.toString().includes(searchTerm));
  }, [searchTerm]);

  return (
    <div className="w-48 bg-gray-100 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Available Electrolyzers ID
      </h3>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Electrolyzer ID"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        {filteredIds.map((id) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`w-full px-4 py-2 text-sm text-center rounded transition-colors ${
              selectedId === id
                ? "bg-orange-500 text-white border-3 border-dashed border-orange-600"
                : "bg-gray-300 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElectrolyzerList;
