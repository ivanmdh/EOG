<?php

namespace App\Traits;

trait SmartSearchTrait
{
    /**
     * Aplica búsqueda inteligente basada en la configuración proporcionada
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $search
     * @param array $config
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function applySmartSearch($query, $search, $config)
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where(function ($q) use ($search, $config) {
            // Búsqueda por folio/ID: TC00015, 00015, 15
            if (isset($config['folio_column'])) {
                // Extraer números del search (TC00015 -> 15, 00015 -> 15, 15 -> 15)
                if (preg_match('/^(?:TC)?0*(\d+)$/i', $search, $matches)) {
                    $folioNumber = $matches[1];
                    $q->orWhere($config['folio_column'], $folioNumber);
                }
                // También buscar por ID exacto si es numérico
                if (is_numeric($search)) {
                    $q->orWhere($config['folio_column'], $search);
                }
            }

            // Búsqueda por fecha: dd/mm/yyyy, dd/mm/yy, mm/yyyy, mm/yy
            if (isset($config['date_columns']) && !empty($config['date_columns'])) {
                // Fecha completa: dd/mm/yyyy o dd/mm/yy
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
                        foreach ($config['date_columns'] as $col) {
                            $q->orWhereDate($col, $searchDate);
                        }
                    }
                }
                // Mes/año: mm/yyyy, m/yyyy, mm/yy, m/yy
                elseif (preg_match('/^(\d{1,2})\/(\d{2,4})$/', $search, $matches)) {
                    $month = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                    $year = $matches[2];
                    
                    // Si el año tiene 2 dígitos, convertir a 4 dígitos
                    if (strlen($year) == 2) {
                        $currentYear = date('Y');
                        $currentCentury = substr($currentYear, 0, 2);
                        $year = $currentCentury . $year;
                    }
                    
                    // Validar que el mes sea válido (1-12)
                    if ($month >= 1 && $month <= 12) {
                        foreach ($config['date_columns'] as $col) {
                            $q->orWhere(function($subQ) use ($col, $month, $year) {
                                $subQ->whereYear($col, $year)
                                     ->whereMonth($col, $month);
                            });
                        }
                    }
                }
            }

            // Búsqueda por estado: convertir número a texto si existe mapeo
            if (isset($config['estado_columns']) && isset($config['estado_map'])) {
                $estadoBusqueda = $search;
                
                // Si es numérico y existe en el mapeo, agregar también el texto
                if (is_numeric($search) && isset($config['estado_map'][$search])) {
                    foreach ($config['estado_columns'] as $col) {
                        $q->orWhere($col, $search); // Búsqueda por número
                        $q->orWhere($col, 'like', "%{$config['estado_map'][$search]}%"); // Búsqueda por texto
                    }
                } else {
                    // Búsqueda por texto: buscar en todos los valores del mapeo
                    $estadoEncontrado = false;
                    foreach ($config['estado_map'] as $numero => $texto) {
                        // Búsqueda flexible: buscar si el texto contiene la búsqueda o viceversa
                        if (stripos($texto, $search) !== false || stripos($search, $texto) !== false) {
                            foreach ($config['estado_columns'] as $col) {
                                $q->orWhere($col, $numero);
                            }
                            $estadoEncontrado = true;
                        }
                    }
                    
                    // Si no se encontró coincidencia exacta, hacer búsqueda libre en las columnas de estado
                    if (!$estadoEncontrado) {
                        foreach ($config['estado_columns'] as $col) {
                            $q->orWhere($col, 'like', "%{$search}%");
                        }
                    }
                }
            }

            // Búsqueda en campos libres
            if (isset($config['free_columns'])) {
                foreach ($config['free_columns'] as $col) {
                    $q->orWhere($col, 'like', "%{$search}%");
                }
            }

            // Búsqueda en relaciones
            if (isset($config['relations'])) {
                foreach ($config['relations'] as $relation => $columns) {
                    $q->orWhereHas($relation, function ($relationQuery) use ($columns, $search) {
                        $relationQuery->where(function($relQ) use ($columns, $search) {
                            foreach ($columns as $col) {
                                $relQ->orWhere($col, 'like', "%{$search}%");
                            }
                        });
                    });
                }
            }
        });
    }

    /**
     * Aplica ordenamiento basado en la configuración proporcionada
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $sortBy
     * @param string $sortDirection
     * @param array $config
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function applySorting($query, $sortBy, $sortDirection, $config)
    {
        // Validar dirección de ordenamiento
        $sortDirection = strtolower($sortDirection);
        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'desc'; // Por defecto descendente
        }

        // Si no se especifica columna, usar el ordenamiento por defecto
        if (empty($sortBy)) {
            $defaultSort = $config['default_sort'] ?? [$config['folio_column'] ?? 'id', 'desc'];
            return $query->orderBy($defaultSort[0], $defaultSort[1]);
        }

        // Mapear campos virtuales/del frontend a campos reales de la base de datos
        $fieldMapping = $config['field_mapping'] ?? [];
        if (isset($fieldMapping[$sortBy])) {
            $sortBy = $fieldMapping[$sortBy];
        }

        // Verificar si es una columna de relación configurada explícitamente
        if (isset($config['sortable_relations']) && array_key_exists($sortBy, $config['sortable_relations'])) {
            $relationConfig = $config['sortable_relations'][$sortBy];
            
            // Usar un subquery para ordenar por relación sin JOIN
            return $query->orderBy(
                function($q) use ($relationConfig, $sortDirection) {
                    $q->select($relationConfig['column'])
                      ->from($relationConfig['table'])
                      ->whereColumn($relationConfig['local_key'], $relationConfig['foreign_key'])
                      ->limit(1);
                },
                $sortDirection
            );
        }

        // Auto-detectar ordenamiento por relaciones basado en el mapeo de campo
        if (isset($config['auto_relation_sort']) && $config['auto_relation_sort']) {
            $relationSorts = $config['relation_sorts'] ?? [];
            if (isset($relationSorts[$sortBy])) {
                $relationInfo = $relationSorts[$sortBy];
                return $query->orderBy(
                    function($q) use ($relationInfo) {
                        $q->select($relationInfo['select_column'])
                          ->from($relationInfo['table'])
                          ->whereColumn($relationInfo['where_column'], $relationInfo['equals_column'])
                          ->limit(1);
                    },
                    $sortDirection
                );
            }
        }

        // Verificar si la columna está permitida para ordenamiento directo
        $allowedColumns = $config['sortable_columns'] ?? [];
        
        if (!empty($allowedColumns) && !in_array($sortBy, $allowedColumns)) {
            // Si no está permitida, usar ordenamiento por defecto
            $defaultSort = $config['default_sort'] ?? [$config['folio_column'] ?? 'id', 'desc'];
            return $query->orderBy($defaultSort[0], $defaultSort[1]);
        }

        // Ordenamiento por columna directa
        return $query->orderBy($sortBy, $sortDirection);
    }
}
