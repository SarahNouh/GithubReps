export default function Star({ onClick, className }: { onClick: () => void; className: string }) {
  return (
    <svg
      className={`favorite ${className}`}
      enableBackground="new 0 0 37 35"
      height="35"
      viewBox="0 0 37 37"
      width="37"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="m19 .791 5.646 11.438 12.624 1.835-9.135 8.904 2.156 12.573-11.291-5.937-11.291 5.937 2.156-12.573-9.135-8.904 12.624-1.835z"
        fill="currentColor"
        stroke="#fee300e8"
        strokeWidth="3"
      />
    </svg>
  );
}
