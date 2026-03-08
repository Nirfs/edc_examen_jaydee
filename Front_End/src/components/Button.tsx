type ButtonProps = {
  variant?: "white" | "blue";
  label: string;
  onCLick?: () => void;
};

export function Button({ variant = "white", label, onCLick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onCLick}
      className={`rounded-md px-3 py-2 text-sm font-semibold transition
        ${
          variant === "blue"
            ? "bg-secondary text-white hover:bg-secondary/10 hover:text-secondary"
            : "text-secondary border border-gray-300 hover:bg-gray-500 hover:text-white"
        }`}
    >
      {label}
    </button>
  );
}
