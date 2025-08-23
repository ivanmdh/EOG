<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use App\Models\LuminariaFoto;

class SyncImagesToS3 extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'images:sync-s3 
                            {--dry-run : Solo mostrar qué archivos se sincronizarían sin subirlos}
                            {--force : Forzar la subida incluso si el archivo ya existe en S3}';

    /**
     * The console command description.
     */
    protected $description = 'Sincroniza las imágenes de luminarias y sus versiones temporales con S3';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $isDryRun = $this->option('dry-run');
        $force = $this->option('force');

        $this->info('🚀 Iniciando sincronización de imágenes con S3...');
        
        if ($isDryRun) {
            $this->warn('⚠️  Modo DRY-RUN activado - No se subirán archivos');
        }

        // Rutas de directorios de imágenes
        $directories = [
            'luminarias/fotos/original',
            'luminarias/fotos/thumb', 
            'luminarias/fotos/preview'
        ];

        $totalFiles = 0;
        $uploadedFiles = 0;
        $skippedFiles = 0;
        $errorFiles = 0;

        foreach ($directories as $directory) {
            $this->info("\n📁 Procesando directorio: {$directory}");
            
            $localPath = storage_path("app/private/{$directory}");
            
            if (!File::exists($localPath)) {
                $this->warn("   ⚠️  Directorio no existe: {$localPath}");
                continue;
            }

            $files = File::files($localPath);
            $this->info("   📊 Archivos encontrados: " . count($files));

            foreach ($files as $file) {
                $totalFiles++;
                $relativePath = "{$directory}/" . $file->getFilename();
                $s3Path = "images/{$relativePath}";

                try {
                    // Verificar si ya existe en S3
                    $existsInS3 = Storage::disk('s3')->exists($s3Path);
                    
                    if ($existsInS3 && !$force) {
                        $this->line("   ⏭️  Ya existe: {$file->getFilename()}");
                        $skippedFiles++;
                        continue;
                    }

                    if ($isDryRun) {
                        $this->line("   📤 Se subiría: {$file->getFilename()} -> {$s3Path}");
                        $uploadedFiles++;
                        continue;
                    }

                    // Subir archivo a S3
                    $fileContent = File::get($file->getPathname());
                    $uploaded = Storage::disk('s3')->put($s3Path, $fileContent, 'public');

                    if ($uploaded) {
                        $this->line("   ✅ Subido: {$file->getFilename()}");
                        $uploadedFiles++;
                    } else {
                        $this->error("   ❌ Error al subir: {$file->getFilename()}");
                        $errorFiles++;
                    }

                } catch (\Exception $e) {
                    $this->error("   ❌ Error con {$file->getFilename()}: " . $e->getMessage());
                    $errorFiles++;
                }
            }
        }

        // Resumen final
        $this->info("\n" . str_repeat('=', 50));
        $this->info('📊 RESUMEN DE SINCRONIZACIÓN');
        $this->info(str_repeat('=', 50));
        $this->info("Total de archivos procesados: {$totalFiles}");
        
        if ($isDryRun) {
            $this->info("Archivos que se subirían: {$uploadedFiles}");
        } else {
            $this->info("Archivos subidos: {$uploadedFiles}");
        }
        
        $this->info("Archivos omitidos (ya existen): {$skippedFiles}");
        
        if ($errorFiles > 0) {
            $this->error("Archivos con errores: {$errorFiles}");
        }

        if ($isDryRun) {
            $this->warn("\n💡 Para ejecutar la sincronización real, ejecuta el comando sin --dry-run");
        } else {
            $this->info("\n🎉 Sincronización completada!");
        }

        return Command::SUCCESS;
    }
}
