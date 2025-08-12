<?php

namespace App\Http\Controllers;

use App\Http\Requests\LuminariaRequest;
use App\Http\Resources\LuminariaMapaResource;
use App\Http\Resources\LuminariaResource;
use App\Models\Luminaria;
use App\Models\LuminariaFoto;
use App\Models\LuminariaLampara;
use Illuminate\Http\Request;
use Intervention\Image\Encoders\JpegEncoder;
use Intervention\Image\Laravel\Facades\Image;

class LuminariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->input('size', 20);
        $page = $request->input('page', 1);
        $search = $request->input('search', '');

        $query = Luminaria::query()
            ->with(['usuario', 'direccion']);

        // Aplicar búsqueda si se proporciona
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                // Búsqueda por ID directo
                $q->where('IDLuminaria', 'like', "%{$search}%");
                
                // Búsqueda por folio (PC00001, PC1, etc.)
                // Si el search empieza con PC, extraer el número
                if (stripos($search, 'PC') === 0) {
                    $folioNumber = preg_replace('/^PC0*/i', '', $search);
                    if (is_numeric($folioNumber)) {
                        $q->orWhere('IDLuminaria', $folioNumber);
                    }
                } else {
                    // Si no empieza con PC, buscar como si fuera el número del folio
                    if (is_numeric($search)) {
                        $q->orWhere('IDLuminaria', $search);
                    }
                }
                
                // Búsqueda por fecha (dd/mm/yyyy o dd/mm/yy)
                if (preg_match('/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/', $search, $matches)) {
                    $day = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                    $month = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                    $year = $matches[3];
                    
                    // Si el año tiene 2 dígitos, convertir a 4 dígitos
                    if (strlen($year) == 2) {
                        $currentYear = date('Y');
                        $currentCentury = substr($currentYear, 0, 2);
                        $year = $currentCentury . $year;
                    }
                    
                    // Crear la fecha en formato Y-m-d para la búsqueda
                    $searchDate = $year . '-' . $month . '-' . $day;
                    
                    // Validar que la fecha sea válida
                    if (checkdate($month, $day, $year)) {
                        $q->orWhereDate('created_at', $searchDate)
                          ->orWhereDate('updated_at', $searchDate);
                    }
                }
                
                // Búsqueda en relaciones con columnas correctas
                $q->orWhereHas('usuario', function ($q) use ($search) {
                      $q->where('nombre', 'like', "%{$search}%")
                        ->orWhere('apellido', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('usuario', 'like', "%{$search}%");
                  })
                  ->orWhereHas('direccion', function ($q) use ($search) {
                      $q->where('nombre', 'like', "%{$search}%")
                        ->orWhere('direccion', 'like', "%{$search}%")
                        ->orWhere('colonia', 'like', "%{$search}%")
                        ->orWhere('num_cuenta', 'like', "%{$search}%")
                        ->orWhere('rpu', 'like', "%{$search}%");
                  });
            });
        }

        $luminarias = $query->orderBy('IDLuminaria', 'desc')
            ->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'data' => LuminariaResource::collection($luminarias->items()),
            'total' => $luminarias->total(),
            'per_page' => $luminarias->perPage(),
            'current_page' => $luminarias->currentPage(),
            'last_page' => $luminarias->lastPage(),
            'from' => $luminarias->firstItem(),
            'to' => $luminarias->lastItem(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function detalles(Request $request)
    {
        return new LuminariaResource(Luminaria::find($request->IDLuminaria));
    }

    public function actualizar(LuminariaRequest $request)
    {
        if ($request->IDLuminaria) {
            $Luminaria = Luminaria::findOrFail($request->IDLuminaria);
        } else {
            $Luminaria = new Luminaria();
        }
        $Luminaria->IDUsuario = auth()->user()->IDUsuario;
        $Luminaria->IDDireccion = $request->direccion[0]['IDDireccion'];
        $Luminaria->latitud = $request->ubicacion['latitud'];
        $Luminaria->longitud = $request->ubicacion['longitud'];
        $Luminaria->save();
        LuminariaLampara::where('IDLuminaria', $Luminaria->IDLuminaria)->delete();
        foreach ($request->luminarias as $luminaria) {
            $foto = LuminariaFoto::where('hash', $luminaria['foto'])->first();
            $foto_secundaria = LuminariaFoto::where('hash', $luminaria['foto_secundaria'])->first();
            $Lampara = new LuminariaLampara();
            $Lampara->IDLuminaria = $Luminaria->IDLuminaria;
            $Lampara->IDPotencia = intval($luminaria['potencia']);
            $Lampara->IDFoto = $foto->IDFoto;
            $Lampara->IDFoto_secundaria = $foto_secundaria->IDFoto;
            $Lampara->numero_serie = $luminaria['numero_serie'];
            
            $Lampara->save();
        }
        return response()->json([
            'success' => true,
            'message' => 'Luminaria guardada correctamente',
            'Luminaria' => $Luminaria,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function eliminar(Request $request)
    {
        $luminaria = Luminaria::findOrFail($request->IDLuminaria);
        $luminaria->delete();
        return response()->json([
            'success' => true,
            'message' => 'Luminaria eliminada correctamente',
        ]);
    }

    public function cargaFoto(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:25000',
        ]);
        $imagen = $request->file('file');
        $hashFoto = hash_file('sha256', $imagen->path());

        $Foto = LuminariaFoto::where('hash', $hashFoto)->first();

        if (!$Foto) {
            $Foto = new LuminariaFoto();
            $Foto->nombre_archivo = $imagen->getClientOriginalName();
            $Foto->ruta_archivo = $imagen->store('luminarias/fotos/original');
            $Foto->tipo_mime = $imagen->getClientMimeType();
            $Foto->tamano_archivo = $imagen->getSize();
            $Foto->ancho = getimagesize($imagen)[0];
            $Foto->alto = getimagesize($imagen)[1];
            $Foto->hash = $hashFoto;
            $Foto->save();

            return response()->json([
                'success' => true,
                'message' => 'Foto subida correctamente',
                'hash' => $hashFoto,
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Foto ya existe',
                'hash' => $hashFoto,
            ]);
        }
    }

    public function obtenerFoto($hash, $tipo = 'original')
    {
        //tipos de imagen:
        // 1. original
        // 2. thumb
        // 3. preview
        $foto = LuminariaFoto::where('hash', $hash)->firstOrFail();
        $ruta = storage_path('app/private/' . $foto->ruta_archivo);
        $base_thumb = 'app/private/luminarias/fotos/thumb/';
        $base_preview = 'app/private/luminarias/fotos/preview/';
        $ruta_thumb = storage_path($base_thumb . basename($foto->ruta_archivo));
        $ruta_preview = storage_path($base_preview . basename($foto->ruta_archivo));

        if (!file_exists($ruta)) {
            return response()->json([
                'success' => false,
                'message' => 'Foto no encontrada',
            ], 404);
        }

        if ($tipo == 'thumb') {
            if (!file_exists($ruta_thumb)) {
                $imagen = Image::read($ruta);
                $imagen->scale(width: 100);
                if (!file_exists(dirname($base_thumb))) {
                    mkdir(dirname($base_thumb), 0777, true);
                }
                $imagen->save($ruta_thumb);
            }
            $ruta = $ruta_thumb;
        } elseif ($tipo == 'preview') {
            if (!file_exists($ruta_preview)) {
                $imagen = Image::read($ruta);
                $imagen->scale(width: 200);
                if (!file_exists(dirname($base_preview))) {
                    mkdir(dirname($base_preview), 0777, true);
                }
                $imagen->save($ruta_preview);
            }
            $ruta = $ruta_preview;
        }

        $imagen = Image::read($ruta);

        $encodedImage = $imagen->encode(new JpegEncoder());

        return response($encodedImage)->header('Content-Type', 'image/jpeg');
    }

    public function mapa(Request $request)
    {
        $Resource = LuminariaMapaResource::class;
        
        // Consulta base de luminarias
        $query = Luminaria::query();
        
        // Filtrar por dirección específica si se proporciona
        if ($request->IDDireccion) {
            $query->where('IDDireccion', $request->IDDireccion);
            $Resource = LuminariaResource::class;
        }
        
        // Filtrar por coordenadas visibles en el mapa si se proporcionan
        if ($request->has('bounds') && is_array($request->bounds)) {
            $bounds = $request->bounds;
            if (isset($bounds['ne']) && isset($bounds['sw'])) {
                // Convertir las columnas VARCHAR a valores numéricos para la comparación
                $query->whereRaw('CAST(latitud AS DECIMAL(10,8)) <= ?', [(float)$bounds['ne']['lat']])
                      ->whereRaw('CAST(latitud AS DECIMAL(10,8)) >= ?', [(float)$bounds['sw']['lat']])
                      ->whereRaw('CAST(longitud AS DECIMAL(11,8)) <= ?', [(float)$bounds['ne']['lng']])
                      ->whereRaw('CAST(longitud AS DECIMAL(11,8)) >= ?', [(float)$bounds['sw']['lng']]);
            }
        }
        
        // Determinar si necesitamos agrupar los resultados
        $shouldGroup = false;
        $zoomLevel = $request->input('zoom', 15); // Valor predeterminado de zoom
        $maxMarkersPerResponse = 200; // Número máximo de marcadores a devolver
        
        // Contar total de luminarias que coinciden con los filtros
        $totalCount = $query->count();
        
        // Si hay demasiadas luminarias, agrupamos o aplicamos límites
        if ($totalCount > $maxMarkersPerResponse && $zoomLevel < 15) {
            $shouldGroup = true;
        }
        
        // Si necesitamos agrupar
        if ($shouldGroup) {
            // Redondear coordenadas para agruparlas en función del nivel de zoom
            $precision = max(4, min(6, $zoomLevel / 3)); // Ajustar precisión según zoom
            
            // Agrupar por coordenadas redondeadas y contar
            $rows = \DB::select("
                SELECT 
                    ROUND(CAST(latitud AS DECIMAL(10,8)), {$precision}) as lat_group,
                    ROUND(CAST(longitud AS DECIMAL(11,8)), {$precision}) as lng_group,
                    COUNT(*) as count
                FROM luminarias
                WHERE deleted_at IS NULL
                " . ($request->IDDireccion ? "AND IDDireccion = {$request->IDDireccion}" : "") . "
                " . ($request->has('bounds') ? "
                AND CAST(latitud AS DECIMAL(10,8)) <= {$bounds['ne']['lat']}
                AND CAST(latitud AS DECIMAL(10,8)) >= {$bounds['sw']['lat']}
                AND CAST(longitud AS DECIMAL(11,8)) <= {$bounds['ne']['lng']}
                AND CAST(longitud AS DECIMAL(11,8)) >= {$bounds['sw']['lng']}" : "") . "
                GROUP BY lat_group, lng_group
                ORDER BY count DESC
                LIMIT {$maxMarkersPerResponse}
            ");
            
            $clusters = [];
            foreach ($rows as $row) {
                $clusters[] = [
                    'isCluster' => true,
                    'count' => $row->count,
                    'ubicacion' => [
                        'latitud' => (float)$row->lat_group,
                        'longitud' => (float)$row->lng_group
                    ]
                ];
            }
            
            return response()->json([
                'success' => true,
                'isAgrupado' => true,
                'totalLuminarias' => $totalCount,
                'Luminarias' => $clusters,
            ]);
        } else {
            // Si no agrupamos, aplicamos límite y paginación
            $perPage = min($maxMarkersPerResponse, $request->input('per_page', $maxMarkersPerResponse));
            $page = $request->input('page', 1);
            
            $Luminarias = $query->limit($maxMarkersPerResponse)
                ->orderBy('IDLuminaria', 'desc')
                ->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'isAgrupado' => false,
                'totalLuminarias' => $totalCount,
                'Luminarias' => $Resource::collection($Luminarias),
                'pagination' => [
                    'current_page' => $Luminarias->currentPage(),
                    'last_page' => $Luminarias->lastPage(),
                    'per_page' => $Luminarias->perPage(),
                    'total' => $Luminarias->total()
                ]
            ]);
        }
    }
}
