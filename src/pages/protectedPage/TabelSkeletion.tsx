import { Skeleton, TableCell, TableRow } from '@mui/material'
interface props {
    row: number,
    col: number,
    height?: number,
    animation?: 'pulse' | 'wave' |false;
    width?: number
}
export default function TabelSkeletion({row, col, height = 40}: props) {
  return (
    <>
        {Array.from({length: row}).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
                {Array.from({length: col}).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                        <Skeleton animation='wave' height={height}/>
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
  )
}
