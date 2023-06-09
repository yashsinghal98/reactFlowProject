import React, { useRef, useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../nodePannel/components/newNodes/customNode/customNode";
import styles from "./flowCont.module.css";

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { customNode: CustomNode };
export default function FlowCont({
  setNodeSelected,
  nodes,
  setNodes,
  edges,
  setEdges,
  onEdgesChange,
}) {
  // We can always create a custom hook for configuring out react flow, but because of time constraint am not able to do that
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // configuring the ondrop function
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "customNode",
        position,
        data: { label: `${type} node` },
        className: styles.cutsomNode,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance,setNodes]
  );

  // triggered whenever an user selects any node, this function set the nodeselected to the selected node
  const handleSelectChange = (changes) => {
    let currentSelected = null;
    console.log(changes);
    if (changes.length === 1) { //because of changes array might give back to unselect any node and then select the next one
      changes.forEach((change) => {
        if (change.type === "select") {
          if (change.selected) {
            currentSelected = change.id;
          } else {
            currentSelected = null;
          }
        }
      });
    } else {
      changes.forEach((change) => {
        if (change.type === "select") {
          if (change.selected) {
            currentSelected = change.id;
          }
        }
      });
    }
    return currentSelected;
  };

  const onNodesChange = useCallback(
    (changes) => {
      if (changes?.[0]?.type === "select")
        setNodeSelected(handleSelectChange(changes));
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes,setNodeSelected]
  );
  return (
    <div className={styles.wrapper} ref={reactFlowWrapper}>
      <ReactFlow
        onDrop={onDrop}
        nodes={nodes}
        edges={edges}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        elementsSelectable={true}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodesDraggable={true}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
