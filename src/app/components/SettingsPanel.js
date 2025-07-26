import { useState, useEffect } from 'react';

export default function SettingsPanel({ selectedNode, onUpdateNode, onBack }) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (selectedNode && selectedNode.data) {
            setText(selectedNode.data.text || '');
        }
    }, [selectedNode]);

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);

        if (selectedNode) {
            onUpdateNode(selectedNode.id, newText);
        }
    };

    if (!selectedNode) {
        return null;
    }

    return (
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center mb-6">
                <button
                    className="bg-transparent border-none text-xl cursor-pointer p-2 mr-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onBack}
                    title="Back to Nodes Panel"
                >
                    ←
                </button>
                <h2 className="text-lg font-bold text-gray-800">Message Settings</h2>
            </div>

            <div className="flex-1">
                <div className="mb-6">
                    <label
                        htmlFor="message-text"
                        className="block text-sm font-semibold text-gray-800 mb-3"
                    >
                        Message Text
                    </label>
                    <textarea
                        id="message-text"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Enter your message..."
                        rows={6}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl text-sm resize-none transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-600 font-medium mb-2">
                        📝 Tips:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Keep messages clear and concise</li>
                        <li>• Use friendly, conversational tone</li>
                        <li>• Changes are saved automatically</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}