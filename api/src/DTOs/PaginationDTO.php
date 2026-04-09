<?php

namespace App\DTOs;

use App\Repository\Pagination;

class PaginationDTO
{
    public array $items = [];
    public int $totalItems = 0;
    public int $page = 1;
    public int $totalPages = 0;
    public int $limit = Pagination::DEFAULT_LIMIT;
}
