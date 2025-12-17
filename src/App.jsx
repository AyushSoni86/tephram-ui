import { useState } from "react";
import { elementIds } from "./data/data";
import ElementList from "./components/ElementList";
import DisassemblyPanel from "./components/DisassemblyPanel";
import ElectrolyzerList from "./components/ElectrolyzerList";
import Header from "./components/Header";
import ConfirmModal from "./components/ConfirmModal";
export default function App() {
  const [selectedElectrolyzer, setSelectedElectrolyzer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElements, setSelectedElements] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState([]);
  const [comments, setComments] = useState({});
  const [disabledElements, setDisabledElements] = useState({});
  console.log("disabledElements::>> ", disabledElements);
  const [modalState, setModalState] = useState({ isOpen: false, action: null });

  const handleToggleElement = (elementId) => {
    setSelectedElements((prev) =>
      prev.includes(elementId)
        ? prev.filter((id) => id !== elementId)
        : [...prev, elementId]
    );
  };

  const handleSelectAll = () => {
    const availableElements = elementIds.filter(
      (el) => !disabledElements[el.id]
    );
    const allSelected = availableElements.every((el) =>
      selectedElements.includes(el.id)
    );

    if (allSelected) {
      setSelectedElements([]);
    } else {
      setSelectedElements(availableElements.map((el) => el.id));
    }
  };

  const handleToggleChecklist = (item) => {
    setSelectedChecklist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleCommentChange = (elementId, value) => {
    setComments((prev) => ({ ...prev, [elementId]: value }));
  };

  const handleSendToRepair = () => {
    setModalState({ isOpen: true, action: "repair" });
  };

  const handleReadyToAssemble = () => {
    setModalState({ isOpen: true, action: "assemble" });
  };

  const handleConfirm = () => {
    const newDisabled = { ...disabledElements };

    selectedElements.forEach((elementId) => {
      newDisabled[elementId] = {
        status: modalState.action,
        checklistCount:
          modalState.action === "repair" ? selectedChecklist.length : 0,
      };
    });

    setDisabledElements(newDisabled);
    setSelectedElements([]);
    setSelectedChecklist([]);
    setComments({});
    setModalState({ isOpen: false, action: null });
  };

  const handleClearSelection = () => {
    setSelectedChecklist([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="bg-gray-100 px-6 py-2 border-b border-gray-300">
        <h2 className="text-sm text-gray-700">Disassembly Electrolyzer</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ElectrolyzerList
          selectedId={selectedElectrolyzer}
          onSelect={setSelectedElectrolyzer}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {selectedElectrolyzer ? (
          <>
            <div className="w-2/5 bg-gray-100 p-4 overflow-y-auto">
              <div className="bg-white rounded shadow-sm">
                <div className="bg-gray-200 px-4 py-3 border-b border-gray-300">
                  <h3 className="text-sm font-medium text-gray-800">
                    Electrolyzer Id: {selectedElectrolyzer}
                  </h3>
                </div>
                <ElementList
                  elements={elementIds}
                  selectedElements={selectedElements}
                  onToggleElement={handleToggleElement}
                  onSelectAll={handleSelectAll}
                  disabledElements={disabledElements}
                />
              </div>
            </div>

            <DisassemblyPanel
              selectedElements={selectedElements}
              selectedChecklist={selectedChecklist}
              onToggleChecklist={handleToggleChecklist}
              comments={comments}
              onCommentChange={handleCommentChange}
              onClearSelection={handleClearSelection}
              onSendToRepair={handleSendToRepair}
              onReadyToAssemble={handleReadyToAssemble}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-sm">
              Select an Electrolyzer ID to begin
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, action: null })}
        onConfirm={handleConfirm}
        elements={selectedElements}
        action={modalState.action}
      />
    </div>
  );
}
