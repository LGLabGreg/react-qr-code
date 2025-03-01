import type { Prop } from '@/types/props'

import { PropTypeTag } from '@/components/prop-type-tag'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const APITable = ({ props }: { props: Prop[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className='w-[150px]'>Prop</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {props.map((prop) => (
        <TableRow key={prop.name}>
          <TableCell className='font-medium'>{prop.name}</TableCell>
          <TableCell>
            <PropTypeTag type={prop.type} />
          </TableCell>
          <TableCell className='max-w-[300px]'>{prop.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
