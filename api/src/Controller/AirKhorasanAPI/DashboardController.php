<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;

final class DashboardController extends AbstractController
{
    #[Route('/api/dashboard', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $newCustomers = $em->getRepository(Customer::class)->findNewCustomers();
        $countMonths = count($newCustomers);
        $thisMonth = $newCustomers[$countMonths - 1]['new_customers'];
        $previousMonth = $newCustomers[$countMonths - 2]['new_customers'];
        $changeInPercentage = $previousMonth > 0 ? (($thisMonth - $previousMonth) / $previousMonth) * 100 : 0;

        $totalCustomers = $em->getRepository(Customer::class)->count([]);

        return $this->json([
            'new_customers' => $newCustomers,
            'total_customers' => $totalCustomers,
            'change_in_percentage' => $changeInPercentage
        ]);
    }
}
