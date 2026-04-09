<?php

namespace App\Repository;

use App\DTOs\PaginationDTO;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

class Pagination {
    private ?QueryBuilder $queryBuilder = null;

    public const int DEFAULT_LIMIT = 10;
    public const int MAX_LIMIT = 50;

    public function __construct(QueryBuilder $queryBuilder)
    {
        $this->queryBuilder = $queryBuilder;
    }

    public function findPaginated(int $page = 1, ?int $limit = null): PaginationDTO
    {
        $limit = $limit ?? self::DEFAULT_LIMIT;
        $limit = min($limit, self::MAX_LIMIT);
        $offset = ($page - 1) * $limit;

        // Set pagination in query
        $query = $this->queryBuilder
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        // Get total results and paginated results
        $paginator = new Paginator($query);
        $totalResults = count($paginator);

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = iterator_to_array($paginator);
        $paginationDTO->totalItems = $totalResults;
        $paginationDTO->page = $page;
        $paginationDTO->limit = $limit;
        $paginationDTO->totalPages = ceil($totalResults / $limit);

        return $paginationDTO;
    }
}
