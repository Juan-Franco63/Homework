// src/components/TreeViewer.jsx
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './TreeViewer.scss';
import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const treeRef = doc(db, 'employeesTree', 'tree');

export default function TreeViewer() {
  const [treeData, setTreeData] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', title: '', parentId: '' });
  const [selectedId, setSelectedId] = useState('');
  const [editData, setEditData] = useState({ name: '', title: '' });

  useEffect(() => {
    const fetchTreeFromFirebase = async () => {
      try {
        const docSnap = await getDoc(treeRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data.data)) {
            const updatedTree = updateSubordinateCounts(data.data);
            setTreeData(updatedTree);
          } else {
            console.warn("Estructura inválida recibida desde Firestore:", data);
          }
        }
      } catch (error) {
        console.error('Error al cargar árbol desde Firebase:', error);
      }
    };
    fetchTreeFromFirebase();
  }, []);

  const getAllNodes = (nodes, list = []) => {
    for (const node of nodes) {
      const id = node.attributes?.id;
      if (id) list.push({ id, name: node.name });
      if (node.children) getAllNodes(node.children, list);
    }
    return list;
  };

  const persistTree = async (data) => {
    await setDoc(treeRef, { data });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const countSubordinates = (node) => {
    if (!node.children || node.children.length === 0) return 0;
    return node.children.reduce(
      (acc, child) => acc + 1 + countSubordinates(child),
      0
    );
  };

  const updateSubordinateCounts = (nodes) => {
    return nodes.map((node) => {
      const subCount = countSubordinates(node);
      const cleanName = node.name.split(' - ')[0];
      const newName = `${cleanName} - [${subCount} subalternos]`;
      return {
        ...node,
        name: newName,
        children: node.children ? updateSubordinateCounts(node.children) : []
      };
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const { id, name, title, parentId } = formData;

    const allIds = getAllNodes(treeData).map((n) => n.id);
    if (allIds.includes(id)) {
      alert(`Ya existe un empleado con ID '${id}'. Usa un ID único.`);
      return;
    }

    const newEmployee = {
      name: `${name} (${title})`,
      attributes: { id, title },
      children: []
    };

    const updateTree = (nodes) =>
      nodes.map((node) => {
        if (node.attributes?.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newEmployee]
          };
        } else if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });

    let updatedTree = [];
    if (parentId === '') {
      updatedTree = [...treeData, newEmployee];
    } else {
      updatedTree = updateTree(treeData);
    }

    const countedTree = updateSubordinateCounts(updatedTree);
    setTreeData(countedTree);
    await persistTree(countedTree);
    setFormData({ id: '', name: '', title: '', parentId: '' });
  };

  const handleEditEmployee = async () => {
    const editTree = (nodes) =>
      nodes.map((node) => {
        if (node.attributes?.id === selectedId) {
          const newName = `${editData.name} (${editData.title})`;
          return {
            ...node,
            name: newName,
            attributes: { ...node.attributes, title: editData.title }
          };
        } else if (node.children) {
          return { ...node, children: editTree(node.children) };
        }
        return node;
      });

    const updated = editTree(treeData);
    const countedTree = updateSubordinateCounts(updated);
    setTreeData(countedTree);
    await persistTree(countedTree);
    setSelectedId('');
    setEditData({ name: '', title: '' });
  };

  const handleDeleteEmployee = async () => {
    const deleteNode = (nodes) =>
      nodes
        .filter((node) => node.attributes?.id !== selectedId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteNode(node.children) : []
        }));
    const updated = deleteNode(treeData);
    const countedTree = updateSubordinateCounts(updated);
    setTreeData(countedTree);
    await persistTree(countedTree);
    setSelectedId('');
    setEditData({ name: '', title: '' });
  };

  return (
    <div className="tree-wrapper">
      <h2>Visualización del Árbol Organizacional</h2>

      <form onSubmit={handleAddEmployee} className="form-add">
        <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} required />
        <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleInputChange} required />
        <input type="text" name="parentId" placeholder="ID del jefe (vacío si es raíz)" value={formData.parentId} onChange={handleInputChange} />
        <button type="submit">Agregar empleado</button>
      </form>

      {treeData.length > 0 && (
        <div className="editor">
          <h3>Editar o eliminar empleado</h3>
          <select
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              const selected = getAllNodes(treeData).find((n) => n.id === e.target.value);
              if (selected) {
                const raw = selected.name.split(' - ')[0];
                const [nameOnly, titleOnly] = raw.split(' (');
                setEditData({ name: nameOnly, title: titleOnly?.replace(')', '') || '' });
              }
            }}
          >
            <option value="">-- Selecciona un empleado --</option>
            {getAllNodes(treeData).map((node) => (
              <option key={node.id} value={node.id}>{node.name}</option>
            ))}
          </select>

          {selectedId && (
            <div className="edit-form">
              <input type="text" name="name" placeholder="Nuevo nombre" value={editData.name} onChange={handleEditInputChange} />
              <input type="text" name="title" placeholder="Nuevo título" value={editData.title} onChange={handleEditInputChange} />
              <button onClick={handleEditEmployee}>Guardar cambios</button>
              <button className="delete" onClick={handleDeleteEmployee}>Eliminar empleado</button>
            </div>
          )}
        </div>
      )}

      {treeData.length === 0 ? (
        <p>Aún no hay empleados registrados.</p>
      ) : (
        <div className="tree-container">
          <Tree
            data={treeData}
            orientation="vertical"
            draggable={true}
            collapsible={false}
            translate={{ x: 400, y: 100 }} // puedes ajustar este valor si deseas
          />
        </div>
      )}
    </div>
  );
}
