export default function NodesPanel() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const nodeTypes = [
        {
            type: 'textNode',
            label: 'Message',
            description: 'Send a text message',
            icon: '💬'
        }
    ];

    return (
        <div className="p-6 flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Nodes Panel</h2>

            <div className="space-y-4">
                {nodeTypes.map((nodeType) => (
                    <div
                        key={nodeType.type}
                        className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-grab transition-all duration-200 bg-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 active:cursor-grabbing group"
                        onDragStart={(event) => onDragStart(event, nodeType.type)}
                        draggable
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg mr-4 flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                            {nodeType.icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">
                                {nodeType.label}
                            </h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                {nodeType.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-medium">
                    💡 Drag nodes from here to the canvas to create your chatbot flow
                </p>
            </div>
        </div>
    );
}