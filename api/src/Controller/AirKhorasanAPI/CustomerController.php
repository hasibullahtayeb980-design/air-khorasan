<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use App\DTOs\CustomerDTO;
use App\DTOs\PaginationDTO;

final class CustomerController extends AbstractController
{
    #[Route('/api/customers', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        $customers = $em->getRepository(Customer::class)->findPaginated($page, $limit);
        $customersDTOCollection = [];

        foreach ($customers->items as $customer) {
            $customerDTO = $objectMapper->map($customer, CustomerDTO::class);
            $customersDTOCollection[] = $customerDTO;
        }

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = $customersDTOCollection;
        $paginationDTO->totalItems = $customers->totalItems;
        $paginationDTO->page = $page;
        $paginationDTO->totalPages = $customers->totalPages;

        return $this->json($paginationDTO);
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
        return $this->json($updatedCustomer);
    }

    #[Route('/api/customers/{id}', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $em, Customer $customer): JsonResponse
    {
        $em->remove($customer);
        $em->flush();

        return new JsonResponse(null, status: 204);
    }
}
