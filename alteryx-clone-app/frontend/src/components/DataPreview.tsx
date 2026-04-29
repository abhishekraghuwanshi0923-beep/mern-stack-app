import React from 'react';

interface DataPreviewProps {
    data?: Array<Record<string, unknown>> | null;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data = [] }) => {
    const rows = (data ?? []) as Array<Record<string, any>>;

    return (
        <div>
            <h2>Data Preview</h2>
            {rows.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(rows[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, idx) => (
                                    <td key={idx}>{String(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available for preview.</p>
            )}
        </div>
    );
};

export default DataPreview;