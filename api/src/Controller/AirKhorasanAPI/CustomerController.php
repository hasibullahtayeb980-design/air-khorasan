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
    public function index(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        $customers = $em->getRepository(Customer::class)->getPaginatedCustomers($page, $limit);
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

    #[Route('/api/customers/{id}', methods: ['PUT', 'PATCH'])]
    public function update(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Customer $customer): JsonResponse
    {
        $content = $request->getContent();
        $updatedCustomer = $serializer->deserialize($content, Customer::class, 'json', ['object_to_populate' => $customer]);

        $em->flush();
        return $this->json($customer);
    }

    #[Route('/api/customers/{id}', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $em, Customer $customer): JsonResponse
    {
        $em->remove($customer);
        $em->flush();

        return new JsonResponse(null, status: 204);
    }
}
