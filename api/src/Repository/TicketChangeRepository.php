<?php

namespace App\Repository;

use App\DTOs\PaginationDTO;
use App\Entity\TicketChange;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<TicketChange>
 */
class TicketChangeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TicketChange::class);
    }

    public function findLatest() {
        return $this->createQueryBuilder('t')
            ->orderBy('t.createdAt', 'DESC')
            ->setMaxResults(5)
            ->getQuery()
            ->getResult();
    }

    public function findPaginated(int $page = 1, ?int $limit = null): PaginationDTO
    {
        $queryBuilder = $this->createQueryBuilder('a')
            ->orderBy('a.createdAt', 'DESC');

        $pagination = new Pagination($queryBuilder);
        return $pagination->findPaginated($page, $limit);
    }
}
