import React, { useState } from 'react';
import { TextField, Button, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type NodeEditorProps = {
    node?: any;
    onSave?: (node: any) => void;
    onClose?: () => void;
    updateDataPreview?: (previewData: any) => void;
};

const NodeEditor = ({ node = {}, onSave, onClose, updateDataPreview }: NodeEditorProps) => {
    const [name, setName] = useState(node.name || '');
    const [type, setType] = useState(node.type || 'filter');
    const [configuration] = useState(node.configuration || {});

    const handleSave = () => {
        const updatedNode = {
            ...node,
            name,
            type,
            configuration,
        };
        if (onSave) {
            onSave(updatedNode);
        }
        if (updateDataPreview) {
            updateDataPreview(updatedNode);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit Node</DialogTitle>
            <DialogContent>
                <TextField
                    label="Node Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    select
                    label="Node Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="filter">Filter</MenuItem>
                    <MenuItem value="sort">Sort</MenuItem>
                    <MenuItem value="formula">Formula</MenuItem>
                </TextField>
                {/* Additional fields for configuration can be added here */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NodeEditor;