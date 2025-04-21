<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Potencia</th>
            <th>Estado</th>
            <th>Dirección</th>
            <th>Fecha de Instalación</th>
            <th>Fecha de Registro</th>
            <th>Última Actualización</th>
        </tr>
    </thead>
    <tbody>
        @foreach($luminarias as $luminaria)
            <tr>
                <td>{{ $luminaria->id }}</td>
                <td>{{ $luminaria->tipo }}</td>
                <td>{{ $luminaria->potencia }}</td>
                <td>{{ $luminaria->estado }}</td>
                <td>{{ $luminaria->direccion ? $luminaria->direccion->nombre : 'Sin dirección' }}</td>
                <td>{{ $luminaria->fecha_instalacion ?? '-' }}</td>
                <td>{{ $luminaria->created_at ? $luminaria->created_at->format('Y-m-d H:i:s') : '-' }}</td>
                <td>{{ $luminaria->updated_at ? $luminaria->updated_at->format('Y-m-d H:i:s') : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
