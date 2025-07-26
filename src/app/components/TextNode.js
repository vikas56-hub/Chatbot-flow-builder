import { Handle, Position } from '@xyflow/react';

export default function TextNode({ data, selected }) {
    const displayText = data.text && data.text.length > 50
        ? data.text.substring(0, 50) + '...'
        : data.text || 'Enter your message...';

    return (
        <div className={`bg-white border-2 rounded-xl shadow-lg min-w-48 max-w-64 transition-all ${selected
                ? 'border-blue-500 shadow-blue-200 shadow-xl'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-gray-500 border-2 border-white"
            />

            <div className="bg-blue-50 px-4 py-3 border-b border-gray-100 flex items-center rounded-t-xl">
                <div className="mr-3 text-lg">💬</div>
                <span className="text-sm font-semibold text-gray-700">Send Message</span>
            </div>

            <div className="p-4 text-sm text-gray-800 leading-relaxed">
                {displayText}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-gray-500 border-2 border-white"
            />
        </div>
    );
}