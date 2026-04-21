<?php

namespace App\Repository;

use App\DTOs\PaginationDTO;
use App\Entity\Visa;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<Visa>
 */
class VisaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Visa::class);
    }

    public function findPaginated(int $page = 1, ?int $limit = null): PaginationDTO
    {
        $queryBuilder = $this->createQueryBuilder('a')
            ->orderBy('a.applicationDate', 'DESC');

        $pagination = new Pagination($queryBuilder);
        return $pagination->findPaginated($page, $limit);
    }
}
