import type { Prop } from '@/types/props'

import { PropTypeTag } from '@/components/prop-type-tag'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const PropsTable = ({ props }: { props: Prop[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className='w-[150px]'>Prop</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Default</TableHead>
        <TableHead>Required</TableHead>
        <TableHead>Possible Values</TableHead>
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
          <TableCell>{prop.defaultValue || ''}</TableCell>
          <TableCell>{prop.required ? 'Yes' : 'No'}</TableCell>
          <TableCell className='max-w-[200px]'>
            {prop.possibleValues ? (
              <div className='flex flex-wrap gap-1'>
                {prop.possibleValues.map((value) => (
                  <Badge key={value} variant='outline' className='text-xs'>
                    {value}
                  </Badge>
                ))}
              </div>
            ) : (
              ''
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
