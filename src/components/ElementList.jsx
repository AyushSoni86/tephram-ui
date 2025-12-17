const ElementList = ({
  elements,
  selectedElements,
  onToggleElement,
  onSelectAll,
  disabledElements,
}) => {
  const allSelected = elements.every((el) => selectedElements.includes(el.id));

  return (
    <div className="flex-1 bg-white">
      <div className="bg-gray-200 px-4 py-3 flex items-center gap-6 border-b border-gray-300">
        <span className="text-sm font-medium text-gray-700">Position</span>
        <span className="text-sm font-medium text-gray-700">
          Elements Part ID
        </span>
        <button
          onClick={onSelectAll}
          className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
        >
          {allSelected ? "Deselect all" : "Select all"}
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {elements.map((element) => {
          const disabled = disabledElements[element.id];
          const isSelected = selectedElements.includes(element.id);

          return (
            <div
              key={element.id}
              className="px-4 py-3 flex items-center gap-4 hover:bg-gray-50"
            >
              <span className="text-sm text-gray-700 w-8">
                {element.position}
              </span>

              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleElement(element.id)}
                disabled={!!disabled}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
              />

              <span
                className={`px-4 py-1.5 text-sm rounded ${
                  disabled
                    ? "bg-gray-300 text-gray-600"
                    : isSelected
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {element.id}
              </span>

              {disabled && (
                <div className="flex items-center gap-2 ml-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      disabled.status === "repair"
                        ? "bg-red-600 text-white"
                        : "bg-teal-600 text-white"
                    }`}
                  >
                    {disabled.status === "repair"
                      ? "Ready for Repair"
                      : "Ready for Assemble"}
                  </span>
                  {disabled.checklistCount > 0 && (
                    <span className="w-6 h-6 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                      {disabled.checklistCount}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElementList;
