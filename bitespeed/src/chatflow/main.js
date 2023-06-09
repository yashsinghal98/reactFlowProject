import { useState } from "react";
import Header from "./header/header";                  //for handling the save setting in the header
import NodePannel from "./body/nodePannel/nodePannel"; // right node pannel for adding new nodes and changing data of new nodes
import FlowCont from "./body/flowCont/flowCont";       // main container for all the nodes and edges
import { useNodesState, useEdgesState } from "reactflow";

export default function ChatFlow() {
  const [nodeSelected, setNodeSelected] = useState(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges,onEdgesChange] = useEdgesState([]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Header nodes={nodes} edges={edges} />                      
      <div style={{ display: "flex", height: "94vh" }}>
        <FlowCont
          nodeSelected={nodeSelected}
          setNodeSelected={setNodeSelected}
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          onEdgesChange={onEdgesChange}
        />
        <NodePannel
          nodeSelected={nodeSelected}
          setNodeSelected={setNodeSelected}
          nodes={nodes}
          setNodes={setNodes}
        />
      </div>
    </div>
  );
}
