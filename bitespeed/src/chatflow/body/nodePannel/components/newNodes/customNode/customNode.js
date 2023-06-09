import styles from './customNode.module.css'
import { Handle, Position } from 'reactflow';
import classNames from 'classnames';

const handleStyle = { left: 0,top:25 };
const handleRightStyle = {left:200,top:25};
// function for creating a custom node
export default function CustomNode({ data, isConnectable=true,selected,id }) {
  return (
    <div className={classNames( styles.customNode,selected? styles.selectedNode:'')}>
      <div>
        <label htmlFor="text" className={styles.nodeTitle}>Send Message</label>
        <div className={styles.nodeInput}>{data?.label}</div>
      </div>
      <Handle
        type="target"
        position={Position.top}
        id={`edge-${id}-left`}
        style={handleStyle}
        isConnectable={isConnectable}
      />
       <Handle
        type="source"
        position={Position.Bottom}
        id={`edge-${id}-right`}
        style={handleRightStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
}
