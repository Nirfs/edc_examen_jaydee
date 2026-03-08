type TaskModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export function TaskModal({ children, onClose }: TaskModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
