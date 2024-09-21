import { Popover } from "./popover";

type ModalProps = {
  children: React.ReactNode;
  onClose?: VoidFunction;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div
      className="flex absolute z-10 w-screen h-screen bg-[#11111199] top-0 left-0"
      onClick={onClose}
    >
      <Popover modal>{children}</Popover>;
    </div>
  );
};

export { Modal };
