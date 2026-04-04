<?php

namespace App\Repository;

use App\Entity\TicketCancellation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<TicketCancellation>
 */
class TicketCancellationRepository extends ServiceEntityRepository
{
    private int $defaultLimit = 10;
    private int $maxLimit = 50;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TicketCancellation::class);
    }

    public function findLatest() {
        return $this->createQueryBuilder('t')
            ->orderBy('t.cancellationDate', 'DESC')
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
    //     * @return TicketCancellation[] Returns an array of TicketCancellation objects
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

    //    public function findOneBySomeField($value): ?TicketCancellation
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
