import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, addEdge, useNodesState, useEdgesState, Node, Edge, Handle, Position } from 'react-flow-renderer';
import NodeEditor from './components/NodeEditor';
import DataPreview from './components/DataPreview';

// Custom node components
const FilterNode = ({ data }: any) => (
    <div style={{ padding: '10px', border: '1px solid #222', borderRadius: '3px', background: '#f0f0f0' }}>
        <Handle type="target" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const SortNode = ({ data }: any) => (
    <div style={{ padding: '10px', border: '1px solid #222', borderRadius: '3px', background: '#e8f5e9' }}>
        <Handle type="target" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const FormulaNode = ({ data }: any) => (
    <div style={{ padding: '10px', border: '1px solid #222', borderRadius: '3px', background: '#f3e5f5' }}>
        <Handle type="target" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="source" position={Position.Bottom} />
    </div>
);

const nodeTypes = {
    filter: FilterNode,
    sort: SortNode,
    formula: FormulaNode,
};

const initialNodes: Node[] = [
    {
        id: '1',
        data: { label: 'Input Data' },
        position: { x: 250, y: 25 },
        type: 'filter',
    },
];
const initialEdges: Edge[] = [];

const App = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [dataPreview, setDataPreview] = useState<any>(null);

    const onConnect = (params: any) => {
        setEdges((eds) => addEdge(params, eds));
    };

    const onNodeDoubleClick = (event: any, node: Node) => {
        setSelectedNode(node);
        setIsEditorOpen(true);
    };

    const handleSaveNode = (updatedNode: any) => {
        setNodes((nds) => nds.map((n) => (n.id === updatedNode.id ? { ...n, ...updatedNode } : n)));
        setSelectedNode(null);
        setIsEditorOpen(false);
    };

    const handleCloseEditor = () => {
        setSelectedNode(null);
        setIsEditorOpen(false);
    };

    const updateDataPreview = (previewData: any) => {
        // Sample preview data to demonstrate the data flow
        const sampleData = [
            { id: 1, name: 'John', age: 28, department: 'Engineering' },
            { id: 2, name: 'Jane', age: 34, department: 'Sales' },
            { id: 3, name: 'Bob', age: 45, department: 'Engineering' },
        ];
        setDataPreview(sampleData);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDoubleClick={onNodeDoubleClick}
                style={{ background: '#f0f0f0' }}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
            {isEditorOpen && selectedNode && (
                <NodeEditor
                    node={selectedNode}
                    onSave={handleSaveNode}
                    onClose={handleCloseEditor}
                    updateDataPreview={updateDataPreview}
                />
            )}
            <DataPreview data={dataPreview} />
        </div>
    );
};

export default App;