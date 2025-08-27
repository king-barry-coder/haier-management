import { CheckCircle, XCircle } from "lucide-react";

interface PopupProps {
  show: boolean;
  type: "success" | "error";
  message: string;
  subMessage?: string;
}

export const StatusPopup: React.FC<PopupProps> = ({
  show,
  type,
  message,
  subMessage,
}) => {
  if (!show) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`max-w-sm w-full p-6 rounded-xl shadow-2xl transform transition-transform scale-100
          ${isSuccess ? "bg-white dark:bg-gray-900" : "bg-white dark:bg-gray-900"}`}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {isSuccess ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500" />
          )}

          <h3
            className={`text-lg font-bold ${
              isSuccess
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
            }`}
          >
            {message}
          </h3>

          {subMessage && (
            <p className="text-gray-600 dark:text-gray-400">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};
