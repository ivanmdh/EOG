<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Dirección</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Fecha Registro</th>
        </tr>
    </thead>
    <tbody>
        @foreach($luminarias as $luminaria)
            <tr>
                <td>{{ $luminaria->IDLuminaria }}</td>
                <td>{{ $luminaria->usuario ? $luminaria->usuario->nombre : '-' }}</td>
                <td>{{ $luminaria->direccion ? $luminaria->direccion->direccion : '-' }}</td>
                <td>{{ $luminaria->latitud }}</td>
                <td>{{ $luminaria->longitud }}</td>
                <td>{{ $luminaria->created_at ? $luminaria->created_at->format('Y-m-d H:i:s') : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
