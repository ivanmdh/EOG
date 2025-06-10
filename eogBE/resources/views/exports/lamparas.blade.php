<table>
    <thead>
        <tr>
            <th>Folio Lámpara</th>
            <th>Folio Luminaria</th>
            <th>Número de Serie</th>
            <th>Potencia</th>
            <th>Usuario</th>
            <th>Dirección</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Fecha Registro</th>
        </tr>
    </thead>
    <tbody>
        @foreach($lamparas as $lampara)
            <tr>
                <td>LC{{ str_pad($lampara->IDLampara, 5, '0', STR_PAD_LEFT) }}</td>
                <td>PC{{ str_pad($lampara->IDLuminaria, 5, '0', STR_PAD_LEFT) }}</td>
                <td>{{ $lampara->numero_serie ?? '-' }}</td>
                <td>{{ $lampara->potencia ? $lampara->potencia->potencia : '-' }}</td>
                <td>{{ $lampara->luminaria && $lampara->luminaria->usuario ? $lampara->luminaria->usuario->nombre . ' ' . $lampara->luminaria->usuario->apellido : '-' }}</td>
                <td>{{ $lampara->luminaria && $lampara->luminaria->direccion ? $lampara->luminaria->direccion->direccion : '-' }}</td>
                <td>{{ $lampara->luminaria ? $lampara->luminaria->latitud : '-' }}</td>
                <td>{{ $lampara->luminaria ? $lampara->luminaria->longitud : '-' }}</td>
                <td>{{ $lampara->created_at ? $lampara->created_at->format('Y-m-d H:i:s') : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
