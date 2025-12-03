import React, { Children, useState } from 'react'
import Box from '@mui/material/Box';
import type {
    randomInt,
    randomName,
    randomId,
    randomBoolean,
} from '@mui/x-data-grid-generator';
import { RichTreeViewPro } from '@mui/x-tree-view-pro/RichTreeViewPro';
import type { RichTreeViewProProps } from '@mui/x-tree-view-pro/RichTreeViewPro';
interface TreeNode {
    id: string,
    label: string,
    children?: TreeNode[] | null // nếu chưa load
}
type TreeProps = RichTreeViewProProps<TreeNode, false>
export default function MenuUser() {
    const [treeData, setTreeData] = useState<TreeNode[]>([{
        id: 'root', label: 'tài khoản', children: null
    }])
    const loadChildren = async (nodeId: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return [
            { id: `${nodeId}-1`, label: `Folder 1`, children: null },
            { id: `${nodeId}-2`, label: `Folder 2`, children: null },
            { id: `${nodeId}-3`, label: `Folder 3`, children: null }
        ];
    }
    const handleExpandedItemsChange: TreeProps['onExpandedItemsChange'] =
        async (event, nodeIds) => {
            const targetId = nodeIds[nodeIds.length - 1];

            // Set loading
            const setLoading = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((n) => {
                    if (n.id === targetId && n.children === null) return { ...n, children: [] };
                    if (n.children) return { ...n, children: setLoading(n.children) };
                    return n;
                });

            setTreeData((prev) => setLoading(prev));

            const children = await loadChildren(targetId);

            // Apply loaded children
            const applyChildren = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((n) => {
                    if (n.id === targetId) return { ...n, children };
                    if (n.children) return { ...n, children: applyChildren(n.children) };
                    return n;
                });

            setTreeData((prev) => applyChildren(prev));
        };

    return (
        <RichTreeViewPro
            items={treeData}
            onExpandedItemsChange={handleExpandedItemsChange}
            defaultExpandedItems={[]}
        />
    );
}