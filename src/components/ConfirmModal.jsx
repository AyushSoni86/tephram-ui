import { X } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, elements, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Confirm Status</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-700">
            Update Status of Element Part ID{" "}
            <span className="font-medium">{elements.join(", ")}</span> to "
            {action === "repair" ? "Ready for Repair" : "Ready for Assembly"}"
          </p>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
