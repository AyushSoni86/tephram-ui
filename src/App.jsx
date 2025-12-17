import { useState } from "react";
import { elementIds } from "./data/data";
import ElementList from "./components/ElementList";
import DisassemblyPanel from "./components/DisassemblyPanel";
import ElectrolyzerList from "./components/ElectrolyzerList";
import Header from "./components/Header";
import ConfirmModal from "./components/ConfirmModal";

export default function App() {
  // Currently selected Electrolyzer ID
  const [selectedElectrolyzer, setSelectedElectrolyzer] = useState(null);

  // Search text for filtering Electrolyzer IDs
  const [searchTerm, setSearchTerm] = useState("");

  // List of currently selected element part IDs
  const [selectedElements, setSelectedElements] = useState([]);

  // Selected checklist items (only used for "Send to Repair")
  const [selectedChecklist, setSelectedChecklist] = useState([]);

  // Comments entered for each selected element (keyed by elementId)
  const [comments, setComments] = useState({});

  /**
   * Keeps track of elements that have already been processed
   * Example:
   * {
   *   "1869": { status: "repair", checklistCount: 5 },
   *   "BR-165": { status: "assemble", checklistCount: 0 }
   * }
   */
  const [disabledElements, setDisabledElements] = useState({});

  // Controls confirmation modal state and action type
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: null, // "repair" | "assemble"
  });

  /**
   * Toggles selection of an individual element part
   * - Adds element if not selected
   * - Removes element if already selected
   */
  const handleToggleElement = (elementId) => {
    setSelectedElements((prev) =>
      prev.includes(elementId)
        ? prev.filter((id) => id !== elementId)
        : [...prev, elementId]
    );
  };

  /**
   * Handles "Select All" functionality
   * - Selects all non-disabled elements
   * - Deselects all if everything is already selected
   */
  const handleSelectAll = () => {
    // Only elements that are not already disabled
    const availableElements = elementIds.filter(
      (el) => !disabledElements[el.id]
    );

    // Check if all available elements are already selected
    const allSelected = availableElements.every((el) =>
      selectedElements.includes(el.id)
    );

    // Toggle behavior
    if (allSelected) {
      setSelectedElements([]);
    } else {
      setSelectedElements(availableElements.map((el) => el.id));
    }
  };

  /**
   * Toggles a checklist item
   * Used only when sending elements to repair
   */
  const handleToggleChecklist = (item) => {
    setSelectedChecklist((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  /**
   * Updates comment text for a specific element
   */
  const handleCommentChange = (elementId, value) => {
    setComments((prev) => ({
      ...prev,
      [elementId]: value,
    }));
  };

  /**
   * Opens confirmation modal for "Send to Repair"
   */
  const handleSendToRepair = () => {
    setModalState({ isOpen: true, action: "repair" });
  };

  /**
   * Opens confirmation modal for "Ready to Assemble"
   */
  const handleReadyToAssemble = () => {
    setModalState({ isOpen: true, action: "assemble" });
  };

  /**
   * Confirms the selected action (Repair or Assemble)
   * - Marks selected elements as disabled
   * - Stores their status and checklist count
   * - Clears current selections
   */
  const handleConfirm = () => {
    const newDisabled = { ...disabledElements };

    selectedElements.forEach((elementId) => {
      newDisabled[elementId] = {
        status: modalState.action,
        checklistCount:
          modalState.action === "repair" ? selectedChecklist.length : 0,
      };
    });

    // Update state after confirmation
    setDisabledElements(newDisabled);
    setSelectedElements([]);
    setSelectedChecklist([]);
    setComments({});
    setModalState({ isOpen: false, action: null });
  };

  /**
   * Clears only checklist selections
   * Does NOT affect selected elements
   */
  const handleClearSelection = () => {
    setSelectedChecklist([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Page Title */}
      <div className="bg-gray-100 px-6 py-2 border-b border-gray-300">
        <h2 className="text-sm text-gray-700">Disassembly Electrolyzer</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel – Electrolyzer List */}
        <ElectrolyzerList
          selectedId={selectedElectrolyzer}
          onSelect={setSelectedElectrolyzer}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Main Content */}
        {selectedElectrolyzer ? (
          <>
            {/* Element List */}
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

            {/* Right Panel – Checklist, Comments & Actions */}
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
          // Empty state
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500 text-sm">
              Select an Electrolyzer ID to begin
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
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
