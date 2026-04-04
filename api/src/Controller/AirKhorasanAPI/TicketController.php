<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ticket;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use App\DTOs\TicketDTO;

final class TicketController extends AbstractController
{
    #[Route('/api/tickets', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        $ticketsDTOCollection = [];
        $tickets = $em->getRepository(Ticket::class)->findPaginated($page, $limit);

        foreach ($tickets['items'] as $ticket) {
            $ticketDTO = $objectMapper->map($ticket, TicketDTO::class);
            $ticketDTO->customerId = $ticket->getCustomer()->getId();
            $ticketDTO->customerFullName = $ticket->getCustomer()->getFullName();
            $ticketDTO->customerAvatarImageUrl = $ticket->getCustomer()->getAvatarImageUrl();
            
            $ticketsDTOCollection[] = $ticketDTO;
        }

        return $this->json($ticketsDTOCollection);
    }
}
