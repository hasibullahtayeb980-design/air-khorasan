<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Commission;
use App\DTOs\CommissionDTO;
use App\DTOs\PaginationDTO;

final class CommissionController extends AbstractController
{
    #[Route('/api/commissions', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        $commissionsDTOCollection = [];
        $commissions = $em->getRepository(Commission::class)->findPaginated($page, $limit);

        foreach ($commissions->items as $commission) {
            $commissionDTO = $objectMapper->map($commission, CommissionDTO::class);
            $commissionDTO->visaId = $commission->getVisa()?->getId();

            $commissionsDTOCollection[] = $commissionDTO;
        }

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = $commissionsDTOCollection;
        $paginationDTO->totalItems = $commissions->totalItems;
        $paginationDTO->page = $page;
        $paginationDTO->totalPages = $commissions->totalPages;

        return $this->json($paginationDTO);
    }
}
