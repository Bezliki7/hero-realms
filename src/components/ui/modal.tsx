import { Popover } from "./popover";

type ModalProps = {
  children: React.ReactNode;
  onClose?: VoidFunction;
  zIndex?: number;
};

const Modal = ({ children, onClose, zIndex = 10 }: ModalProps) => {
  return (
    <div
      style={{ zIndex }}
      className={`flex absolute w-screen h-screen bg-[#11111199] top-0 left-0`}
      onClick={onClose}
    >
      <Popover modal>{children}</Popover>
    </div>
  );
};

export { Modal };
