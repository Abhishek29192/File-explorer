import React, { useState } from 'react';
import FileExplorer from './component/FileExplorer';
import { exploereData } from './data/FolderData';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState(exploereData);

  const addNode = (nodeId, newNode) => {
    const addHelper = (node) => {
      if (node.id === nodeId && node.isFolder) {
        return {
          ...node,
          items: [...(node.items || []), newNode]
        };
      }
      if (node.items) {
        return {
          ...node,
          items: node.items.map(addHelper)
        };
      }
      return node;
    };
    setTreeData(prev => addHelper(prev));
  };

  const deleteNode = (nodeId) => {
    const deleteHelper = (node) => {
      if (!node.items) return node;

      return {
        ...node,
        items: node.items
          .filter(item => item.id !== nodeId)
          .map(item => item.isFolder ? deleteHelper(item) : item)
      };
    };
    if (treeData.id === nodeId) {
      alert("Cannot delete the root node directly.");
      return;
    }
    setTreeData(prev => deleteHelper(prev));
  };

  return (
    <div className="App">
      <h1>Simple File Explorer</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <FileExplorer node={treeData} onAdd={addNode} onDelete={deleteNode} />
      </div>
    </div>
  );
}

export default App;
