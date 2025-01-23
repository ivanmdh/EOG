import { CommonTableProp } from "@Types/TableType"
import { Table } from "reactstrap"

const CommonReactTable: React.FC<CommonTableProp> = ({ tableClass, strip, caption, size, hover, headClass, headRowClass, headData, children }) => {
    return (
        <div className={ `table-responsive custom-scrollbar` }>
            <Table striped={ strip } hover={ hover } size={ size } className={ tableClass }>
                { caption && <caption>{ caption }</caption> }
                <thead className={ headClass ? headClass : "text-center" }>
                <tr className={ headRowClass }>
                    { headData.map((head: any, index) => (
                        <th key={ index } className={ tableClass ? tableClass : "" } scope="col">
                            { head.titulo }
                        </th>
                    )) }
                </tr>
                </thead>
                <tbody>{ children }</tbody>
            </Table>
        </div>
    )
}

export default CommonReactTable