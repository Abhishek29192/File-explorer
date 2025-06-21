import React, { useState } from 'react';
import { FaFolder, FaFile } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const FileExplorer = ({ node, onAdd, onDelete }) => {
  const [expand, setExpand] = useState(false);

  const toggle = () => {
    setExpand(prev => !prev);
  };

  const handleAdd = () => {
    const name = prompt("Enter name for new item:");
    if (!name) return;

    const isFolder = window.confirm("Is it a folder?");
    const newItem = {
      id: Date.now().toString(),
      name,
      isFolder,
      items: isFolder ? [] : undefined
    };

    onAdd(node.id, newItem);
    setExpand(true);
  };

  const handleDelete = () => {
    onDelete(node.id);
  };

  const hasChildren = node?.isFolder && node.items && node.items.length > 0;

  return (
    <div style={{ marginLeft: '20px' }}>
      <div
        style={{
          display: "flex",
          width: "200px",
          border: "1px solid black",
          padding: "5px",
          borderRadius: "5px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5px"
        }}
        onClick={toggle}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {node.isFolder ? <FaFolder color='goldenrod' /> : <FaFile color='gray' />}
          <span style={{ marginLeft: "10px" }}>{node.name}</span>
        </div>
        <div>
          {node.isFolder && (
            <AiFillFileAdd
              color='black'
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              style={{ marginRight: "5px" }}
            />
          )}
          {node.id !== "1" && (
            <MdDelete
              color='red'
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            />
          )}
        </div>
      </div>

      {expand && hasChildren && (
        <div>
          {node.items.map((item) => (
            <FileExplorer
              key={item.id}
              node={item}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
