import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useCardModal } from "@/features/card/state/useCardModal";
import { useCard } from "../hooks/useCard";

export default function CardModal() {
  const { openCardId, close } = useCardModal();
  const { data: card } = useCard(openCardId);

  console.log("Modal openCardId:", openCardId);

  return (
    <Transition show={!!openCardId} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
              <Dialog.Title className="text-xl font-semibold mb-2">
                {card?.title || "Loading..."}
              </Dialog.Title>

              <p className="text-gray-600 text-sm mb-4">{card?.description} </p>

              <button
                onClick={close}
                className="text-sm text-blue-600 hover:underline"
              >
                Close
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
