import { Fragment, useRef, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  open: boolean;
  closeModal: (val: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
};

const Modal: React.FC<Props> = ({ size = "sm", ...props }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform rounded-sm bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${
                  size === "sm" && "sm:max-w-lg"
                } ${size === "md" && "sm:max-w-xl"} ${
                  size === "lg" && "sm:max-w-3xl"
                } ${size === "xl" && "sm:max-w-6xl"} `}
              >
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
