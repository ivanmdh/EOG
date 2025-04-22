<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Núm. Cuenta</th>
            <th>RPU</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Colonia</th>
            <th>Tarifa</th>
            <th>Hilos</th>
            <th>Carga Instalada</th>
            <th>Demanda Cont.</th>
            <th>Tipo Suministro</th>
            <th>Promedio Diario</th>
            <th>Núm. Medidor</th>
            <th>Año</th>
            <th>Fecha Censo</th>
            <th>Núm. Lámparas</th>
            <th>Lamparas censadas</th>
            <th>Fecha Registro</th>
        </tr>
    </thead>
    <tbody>
        @foreach($direcciones as $direccion)
            <tr>
                <td>{{ $direccion->IDDireccion }}</td>
                <td>{{ $direccion->num_cuenta }}</td>
                <td>{{ $direccion->rpu }}</td>
                <td>{{ $direccion->nombre }}</td>
                <td>{{ $direccion->direccion }}</td>
                <td>{{ $direccion->colonia }}</td>
                <td>{{ $direccion->tarifa }}</td>
                <td>{{ $direccion->hilos }}</td>
                <td>{{ $direccion->carga_instalada }}</td>
                <td>{{ $direccion->demanda_cont }}</td>
                <td>{{ $direccion->tipo_sum }}</td>
                <td>{{ $direccion->promedio_diario }}</td>
                <td>{{ $direccion->num_medidor }}</td>
                <td>{{ $direccion->anio }}</td>
                <td>{{ $direccion->fecha_censo }}</td>
                <td>{{ $direccion->num_lamparas }}</td>
                <td>{{ $direccion->luminarias ? $direccion->luminarias->count() : 0 }}</td>
                <td>{{ $direccion->created_at ? $direccion->created_at->format('Y-m-d H:i:s') : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
