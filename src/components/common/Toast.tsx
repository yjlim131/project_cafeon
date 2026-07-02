type ToastProps = {
  message: string;
  open: boolean;
};

export function Toast({ message, open }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+92px)] z-[60] mx-auto flex max-w-[430px] justify-center px-5">
      <div className="rounded-2xl bg-espresso-800 px-4 py-3 text-sm font-medium text-cream-100 shadow-modal">
        {message}
      </div>
    </div>
  );
}
