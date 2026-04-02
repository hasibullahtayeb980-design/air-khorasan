<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

final class CustomerController extends AbstractController
{
    #[Route('/api/customers', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $customers = $em->getRepository(Customer::class)->findBy([], limit: 10);
        return $this->json($customers);
    }

    #[Route('/api/customers/{id}', methods: ['GET'])]
    public function show(Customer $customer): JsonResponse
    {      
        return $this->json($customer);
    }

    #[Route('/api/customers', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $content = $request->getContent();
        $customer = $serializer->deserialize($content, Customer::class, 'json');

        $em->persist($customer);
        $em->flush();

        return $this->json($customer, status: 201);
    }
}
