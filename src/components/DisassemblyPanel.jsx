import { checklistItems } from "../data/data";

const DisassemblyPanel = ({
  selectedElements,
  selectedChecklist,
  onToggleChecklist,
  comments,
  onCommentChange,
  onClearSelection,
  onSendToRepair,
  onReadyToAssemble,
}) => {
  if (selectedElements.length === 0) {
    return (
      <div className="w-3/5 bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-blue-600 text-sm text-center px-8 py-4 bg-blue-50 rounded">
          Select an Electrolyzer ID and then Select one or more element part ID
          to start disassembly
        </p>
      </div>
    );
  }

  return (
    <div className="w-3/5 bg-gray-50 p-6 space-y-6 overflow-y-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cut Out Comments
        </label>
        <textarea
          placeholder="Cut Out Comments here"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-800">
              Disassembly Checklist
            </h3>
            {selectedChecklist.length > 0 && (
              <span className="w-6 h-6 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                {selectedChecklist.length}
              </span>
            )}
          </div>
          <button
            onClick={onClearSelection}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Selection
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {checklistItems.map((item) => (
            <button
              key={item}
              onClick={() => onToggleChecklist(item)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedChecklist.includes(item)
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-white border border-gray-200 rounded">
          <div className="grid grid-cols-2 bg-gray-100 border-b border-gray-200">
            <div className="px-4 py-2 text-sm font-medium text-gray-700">
              Element Part ID
            </div>
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-l border-gray-200">
              Comments
            </div>
          </div>

          {selectedElements.map((elementId) => (
            <div
              key={elementId}
              className="grid grid-cols-2 border-b border-gray-200 last:border-b-0"
            >
              <div className="px-4 py-3 text-sm text-gray-800">{elementId}</div>
              <div className="px-4 py-3 border-l border-gray-200">
                <input
                  type="text"
                  placeholder="Write your comment"
                  value={comments[elementId] || ""}
                  onChange={(e) => onCommentChange(elementId, e.target.value)}
                  className="w-full text-sm text-gray-600 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSendToRepair}
          disabled={selectedChecklist.length === 0}
          className="flex-1 px-4 py-2.5 bg-black text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Send to Repair
        </button>
        <button
          onClick={onReadyToAssemble}
          className="flex-1 px-4 py-2.5 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400 transition-colors"
        >
          Ready to Assemble
        </button>
      </div>
    </div>
  );
};

export default DisassemblyPanel;
