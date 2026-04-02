<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;

final class CustomerController extends AbstractController
{
    #[Route('/api/customers', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $customers = $em->getRepository(Customer::class)->findBy([], limit: 10);
        return $this->json($customers);
    }
}
