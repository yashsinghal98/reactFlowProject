import styles from "./nodePannel.module.css";
import NewNode from "./components/newNodes/newNodes";                    // for adding new node to the flow
import SelectedNode from "./components/selectedNode/selectedNode";       // for editing the current selected node
import { nodeTypesList } from "./constant";
export default function NodePannel({
  nodeSelected,
  nodes,
  setNodes,
  setNodeSelected,
}) {
  return (
    <div className={styles.wrapper}>
      {!nodeSelected ? (
        <NewNode nodeTypesList={nodeTypesList} />
      ) : (
        <SelectedNode
          nodeSelected={nodeSelected}
          nodes={nodes}
          setNodes={setNodes}
          setNodeSelected={setNodeSelected}
        />
      )}
    </div>
  );
}
