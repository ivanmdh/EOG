<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Calle</th>
            <th>Número</th>
            <th>Colonia</th>
            <th>Código Postal</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Cantidad de Luminarias</th>
            <th>Fecha Registro</th>
            <th>Última Actualización</th>
        </tr>
    </thead>
    <tbody>
        @foreach($direcciones as $direccion)
            <tr>
                <td>{{ $direccion->id }}</td>
                <td>{{ $direccion->nombre ?? '-' }}</td>
                <td>{{ $direccion->calle ?? '-' }}</td>
                <td>{{ $direccion->numero ?? '-' }}</td>
                <td>{{ $direccion->colonia ?? '-' }}</td>
                <td>{{ $direccion->codigo_postal ?? '-' }}</td>
                <td>{{ $direccion->ciudad ?? '-' }}</td>
                <td>{{ $direccion->estado ?? '-' }}</td>
                <td>{{ $direccion->luminarias ? $direccion->luminarias->count() : 0 }}</td>
                <td>{{ $direccion->created_at ? $direccion->created_at->format('Y-m-d H:i:s') : '-' }}</td>
                <td>{{ $direccion->updated_at ? $direccion->updated_at->format('Y-m-d H:i:s') : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
