<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Visa;
use App\DTOs\VisaDTO;

final class VisaController extends AbstractController
{
    #[Route('/api/visas', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        $visasDTOCollection = [];
        $visas = $em->getRepository(Visa::class)->findPaginated($page, $limit);

        foreach ($visas['items'] as $visa) {
            $visaDTO = $objectMapper->map($visa, VisaDTO::class);
            $visaDTO->commissionId = $visa->getCommission()?->getId();
            $visaDTO->customerId = $visa->getCustomer()->getId();
            $visaDTO->customerFullName = $visa->getCustomer()->getFullName();
            $visaDTO->customerAvatarImageUrl = $visa->getCustomer()->getAvatarImageUrl();

            $visasDTOCollection[] = $visaDTO;
        }

        return $this->json([
            'items' => $visasDTOCollection,
            'total' => $visas['total'],
            'page' => $page,
            'pages' => $visas['pages']
        ]);
    }
}
