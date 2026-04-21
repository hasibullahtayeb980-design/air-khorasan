<?php

namespace App\Repository;

use App\DTOs\PaginationDTO;
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
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Customer::class);
    }

    public function findMonthlyNewCustomers() {
        return $this->createQueryBuilder('a')
            ->select("DATE_FORMAT(a.createdAt, '%Y-%m') AS month_year", 'COUNT(a.id) AS new_customers')
            ->groupBy('month_year')
            ->orderBy('month_year')
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
