<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ticket;
use App\Entity\TicketChange;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;
use App\DTOs\TicketDTO;
use App\DTOs\TicketChangeDTO;
use App\DTOs\TicketCancellationDTO;
use App\Entity\TicketCancellation;

final class TicketController extends AbstractController
{
    #[Route('/api/tickets', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $status = $request->query->getInt('status', 0);
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);

        if ($status === 1) {
            return $this->indexChanged($page, $limit, $em, $objectMapper);
        } else if ($status === 2) {
            return $this->indexCancelled($page, $limit, $em, $objectMapper);
        }

        $ticketsDTOCollection = [];
        $tickets = $em->getRepository(Ticket::class)->findPaginated($page, $limit);

        foreach ($tickets['items'] as $ticket) {
            $ticketDTO = $objectMapper->map($ticket, TicketDTO::class);
            $ticketDTO->customerId = $ticket->getCustomer()->getId();
            $ticketDTO->customerFullName = $ticket->getCustomer()->getFullName();
            $ticketDTO->customerAvatarImageUrl = $ticket->getCustomer()->getAvatarImageUrl();
            
            $ticketsDTOCollection[] = $ticketDTO;
        }

        return $this->json([
            'items' => $ticketsDTOCollection,
            'total' => $tickets['total'],
            'page' => $page,
            'pages' => $tickets['pages']
        ]);
    }

    private function indexChanged($page, $limit, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $ticketsChangedDTOCollection = [];
        $ticketsChanged = $em->getRepository(TicketChange::class)->findPaginated($page, $limit);

        foreach ($ticketsChanged['items'] as $ticketChange) {
            $ticketChangeDTO = $objectMapper->map($ticketChange, TicketChangeDTO::class);
            $ticketChangeDTO->customerId = $ticketChange->getTicket()->getCustomer()->getId();
            $ticketChangeDTO->customerFullName = $ticketChange->getTicket()->getCustomer()->getFullName();
            $ticketChangeDTO->customerAvatarImageUrl = $ticketChange->getTicket()->getCustomer()->getAvatarImageUrl();
            
            $ticketsChangedDTOCollection[] = $ticketChangeDTO;
        }

        return $this->json([
            'items' => $ticketsChangedDTOCollection,
            'total' => $ticketsChanged['total'],
            'page' => $page,
            'pages' => $ticketsChanged['pages']
        ]);
    }

    private function indexCancelled($page, $limit, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $ticketsCancelledDTOCollection = [];
        $ticketsCancelled = $em->getRepository(TicketCancellation::class)->findPaginated($page, $limit);

        foreach ($ticketsCancelled['items'] as $ticketCancellation) {
            $ticketCancellationDTO = $objectMapper->map($ticketCancellation, TicketCancellationDTO::class);
            $ticketCancellationDTO->customerId = $ticketCancellation->getTicket()->getCustomer()->getId();
            $ticketCancellationDTO->customerFullName = $ticketCancellation->getTicket()->getCustomer()->getFullName();
            $ticketCancellationDTO->customerAvatarImageUrl = $ticketCancellation->getTicket()->getCustomer()->getAvatarImageUrl();
            
            $ticketsCancelledDTOCollection[] = $ticketCancellationDTO;
        }

        return $this->json([
            'items' => $ticketsCancelledDTOCollection,
            'total' => $ticketsCancelled['total'],
            'page' => $page,
            'pages' => $ticketsCancelled['pages']
        ]);
    }
}
