import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  isOpen,
  closeModal,
  title,
  description,
  children,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        {/* Overlay */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-25"
          aria-hidden="true"
        ></div>

        {/* Modal Panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="relative w-full max-w-md rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6">
                {/* Title */}
                {title && (
                  <DialogTitle
                    as="h3"
                    className="text-lg font-bold text-darkGray dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                )}

                {/* Description */}
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-mediumGray dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                )}

                {/* Content */}
                <div className="mt-4">{children}</div>

                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-mediumGray dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
