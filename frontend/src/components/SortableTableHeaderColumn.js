import React from 'react'
import { DESCENDING } from '../utils/sorting'
import FaSortAsc from 'react-icons/lib/fa/sort-asc'
import FaSortDesc from 'react-icons/lib/fa/sort-desc'
import '../css/SortableTableHeaderColumn.css'

const SortableTableHeaderColumn = (props) =>
  <th className="SortableTableHeaderColumn" onClick={() => props.onClick(props.property)}>
    { props.children }
    { props.orderBy.property === props.property &&
      (
        props.orderBy.direction === DESCENDING ?
        <FaSortDesc size={18}/> :
        <FaSortAsc size={18}/>
      )
    }
  </th>

export default SortableTableHeaderColumn
