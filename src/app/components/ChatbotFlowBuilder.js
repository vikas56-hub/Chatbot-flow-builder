'use client';

import { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Controls, Background, MiniMap, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Header from './Header';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import TextNode from './TextNode';

const nodeTypes = {
    textNode: TextNode,
};

const initialNodes = [
    {
        id: '1',
        type: 'textNode',
        position: { x: 250, y: 100 },
        data: { text: 'Hello! Welcome to our chatbot.' },
    },
    {
        id: '2',
        type: 'textNode',
        position: { x: 450, y: 300 },
        data: { text: 'How can I help you today?' },
    },
];

const initialEdges = [];

function FlowBuilder() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [showNodesPanel, setShowNodesPanel] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) => {
            const existingEdge = edges.find(edge =>
                edge.source === params.source && edge.sourceHandle === params.sourceHandle
            );

            if (existingEdge) {
                setEdges((eds) => eds.filter(edge => edge.id !== existingEdge.id));
            }

            setEdges((eds) => addEdge(params, eds));
        },
        [edges]
    );

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
        setShowNodesPanel(false);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
        setShowNodesPanel(true);
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: `${Date.now()}`,
                type,
                position,
                data: { text: 'New message' },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    const updateNodeText = useCallback((nodeId, newText) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, text: newText } }
                    : node
            )
        );
    }, []);

    const saveFlow = useCallback(() => {
        setError(null);
        setSuccess(null);

        if (nodes.length > 1) {
            const nodesWithoutIncomingEdges = nodes.filter(node => {
                return !edges.some(edge => edge.target === node.id);
            });

            if (nodesWithoutIncomingEdges.length > 1) {
                setError('Cannot save flow. More than one node has empty target handles.');
                return;
            }
        }

        setSuccess('Flow saved successfully!');
    }, [nodes, edges]);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header
                onSave={saveFlow}
                error={error}
                success={success}
                onClearError={() => setError(null)}
                onClearSuccess={() => setSuccess(null)}
            />

            <div className="flex-1 flex">
                <div className="flex-1 h-full" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}

                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        fitView
                        defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
                        minZoom={0.3}
                        maxZoom={2}
                        className="bg-gray-100"
                    >
                        <Controls className="bg-white shadow-lg" />
                        <MiniMap className="bg-white shadow-lg" />
                        <Background variant="dots" gap={12} size={1} color="#e5e7eb" />
                    </ReactFlow>
                </div>

                <div className="w-80 bg-white border-l border-gray-300 flex flex-col shadow-lg">
                    {showNodesPanel ? (
                        <NodesPanel />
                    ) : (
                        <SettingsPanel
                            selectedNode={selectedNode}
                            onUpdateNode={updateNodeText}
                            onBack={() => {
                                setSelectedNode(null);
                                setShowNodesPanel(true);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ChatbotFlowBuilder() {
    return (
        <ReactFlowProvider>
            <FlowBuilder />
        </ReactFlowProvider>
    );
}