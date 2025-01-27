<?php

namespace App\Http\Controllers;

use App\Http\Requests\LuminariaRequest;
use App\Http\Resources\LuminariaMapaResource;
use App\Http\Resources\LuminariaResource;
use App\Models\Luminaria;
use App\Models\LuminariaFoto;
use App\Models\LuminariaLampara;
use Illuminate\Http\Request;

class LuminariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $direcciones = Luminaria::query()
            ->paginate($perPage);

        return LuminariaResource::collection($direcciones);
    }

    /**
     * Display the specified resource.
     */
    public function detalles(Luminaria $luminaria)
    {
        //
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
            $Lampara = new LuminariaLampara();
            $Lampara->IDLuminaria = $Luminaria->IDLuminaria;
            $Lampara->IDPotencia = intval($luminaria['potencia']);
            $Lampara->IDFoto = $foto->IDFoto;
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
    public function eliminar(Luminaria $luminaria)
    {
        //
    }

    public function cargaFoto(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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

    public function mapa()
    {
        $Luminarias = Luminaria::all();
        return response()->json([
            'success' => true,
            'Luminarias' => LuminariaMapaResource::collection($Luminarias),
        ]);
    }
}
