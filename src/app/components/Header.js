export default function Header({ onSave, error, success, onClearError, onClearSuccess }) {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4 grid grid-cols-3 items-center gap-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-800 justify-self-start">
                Chatbot Flow Builder
            </h1>

            <div className="justify-self-center">
                {error && (
                    <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse shadow-lg">
                        <span className="mr-2 text-base">⚠️</span>
                        <span className="mr-3">{error}</span>
                        <button
                            className="bg-transparent border-none text-white text-lg font-bold cursor-pointer px-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
                            onClick={onClearError}
                            title="Close error"
                        >
                            ×
                        </button>
                    </div>
                )}

                {success && (
                    <div className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse shadow-lg">
                        <span className="mr-2 text-base">✅</span>
                        <span className="mr-3">{success}</span>
                        <button
                            className="bg-transparent border-none text-white text-lg font-bold cursor-pointer px-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
                            onClick={onClearSuccess}
                            title="Close success message"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>

            <button
                className="bg-blue-600 text-white border-none px-6 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all hover:bg-blue-700 hover:shadow-lg w-fit whitespace-nowrap justify-self-end"
                onClick={onSave}
            >
                Save Changes
            </button>
        </div>
    );
}