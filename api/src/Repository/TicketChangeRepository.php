<?php

namespace App\Repository;

use App\Entity\TicketChange;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<TicketChange>
 */
class TicketChangeRepository extends ServiceEntityRepository
{
    private int $defaultLimit = 10;
    private int $maxLimit = 50;

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

    public function findPaginated(int $page = 1, ?int $limit = null): array
    {
        $limit = $limit ?? $this->defaultLimit;
        $limit = min($limit, $this->maxLimit);
        $offset = ($page - 1) * $limit;

        // Set pagination in query
        $queryBuilder = $this->createQueryBuilder('a')
            ->orderBy('a.createdAt', 'DESC')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        // Get total results and paginated results
        $paginator = new Paginator($queryBuilder);
        $totalResults = count($paginator);

        return [
            'items' => iterator_to_array($paginator),
            'total' => $totalResults,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($totalResults / $limit),
        ];
    }

    //    /**
    //     * @return TicketChange[] Returns an array of TicketChange objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('t.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?TicketChange
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
