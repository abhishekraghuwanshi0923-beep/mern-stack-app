# Alteryx Clone App

## Overview
The Alteryx Clone App is an ETL (Extract, Transform, Load) tool built using React for the frontend and Python for the backend. It allows users to create data flow pipelines visually, apply transformations, and preview the results in real-time.

## Features
- **Node Management**: Create, edit, and remove nodes in the data flow pipeline. Nodes are draggable and connectable.
- **Instant Operations**: Apply filters, sorting, and formulas on data instantly with a user-friendly interface.
- **Data Flow Execution**: Execute the pipeline in sequence from source to transformations to output, with clear error handling.
- **Responsive UI**: Built with Material UI for a consistent and intuitive user experience.

## Project Structure
```
alteryx-clone-app
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── NodeEditor.tsx
│   │   │   └── DataPreview.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── react-app-env.d.ts
│   ├── build
│   │   ├── index.html
│   │   ├── asset-manifest.json
│   │   └── static
│   │       ├── css
│   │       │   └── main.44a0c989.css
│   │       └── js
│   │           ├── main.d21908cc.js
│   │           └── main.d21908cc.js.LICENSE.txt
│   ├── package.json
│   └── tsconfig.json
├── backend
│   ├── app.py
│   ├── etl_logic.py
│   ├── requirements.txt
│   └── tests
│       └── test_etl_logic.py
├── .gitignore
└── README.md
```

## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Backend
1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```
   python -m venv .venv
   ```
3. Activate the virtual environment:
   - On Windows: `.venv\Scripts\activate`
   - On macOS/Linux: `source .venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the Flask application:
   ```
   python app.py
   ```

## Testing

### Backend
1. Navigate to the `backend` directory.
2. Activate the virtual environment (if not already activated).
3. Run tests:
   ```
   python -m unittest tests/test_etl_logic.py
   ```

## Usage
- Open the application in your browser to access the ETL tool.
- Use the Node Editor to create and configure nodes.
- Connect nodes to define the data flow.
- Preview data after each transformation to see the results.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.