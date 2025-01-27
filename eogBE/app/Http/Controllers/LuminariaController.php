<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLuminariaRequest;
use App\Http\Requests\UpdateLuminariaRequest;
use App\Models\Luminaria;
use App\Models\LuminariaFoto;
use Illuminate\Http\Request;

class LuminariaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLuminariaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Luminaria $luminaria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Luminaria $luminaria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLuminariaRequest $request, Luminaria $luminaria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Luminaria $luminaria)
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
}
