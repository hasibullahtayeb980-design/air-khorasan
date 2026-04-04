<?php

namespace App\Repository;

use App\Entity\Customer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<Customer>
 */
class CustomerRepository extends ServiceEntityRepository
{
    private int $defaultLimit = 10;
    private int $maxLimit = 50;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Customer::class);
    }

    public function findNewCustomers() {
        return $this->createQueryBuilder('a')
            ->select("DATE_FORMAT(a.createdAt, '%Y-%m') AS month_year", 'COUNT(a.id) AS new_customers')
            ->groupBy('month_year')
            ->orderBy('month_year')
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
    //     * @return Customer[] Returns an array of Customer objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Customer
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
