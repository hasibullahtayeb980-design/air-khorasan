<?php

namespace App\Controller\AirKhorasanAPI;

use App\DTOs\PaginationDTO;
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
        }

        if ($status === 2) {
            return $this->indexCancelled($page, $limit, $em, $objectMapper);
        }

        return $this->indexAll($page, $limit, $em, $objectMapper);
    }

    private function indexAll($page, $limit, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $ticketsDTOCollection = [];
        $ticketsPaginated = $em->getRepository(Ticket::class)->findPaginated($page, $limit);

        foreach ($ticketsPaginated->items as $ticket) {
            $ticketDTO = $objectMapper->map($ticket, TicketDTO::class);
            $ticketDTO->customerId = $ticket->getCustomer()->getId();
            $ticketDTO->customerFullName = $ticket->getCustomer()->getFullName();
            $ticketDTO->customerAvatarImageUrl = $ticket->getCustomer()->getAvatarImageUrl();

            $ticketsDTOCollection[] = $ticketDTO;
        }

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = $ticketsDTOCollection;
        $paginationDTO->totalItems = $ticketsPaginated->totalItems;
        $paginationDTO->page = $page;
        $paginationDTO->totalPages = $ticketsPaginated->totalPages;

        return $this->json($paginationDTO);
    }

    private function indexChanged($page, $limit, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $ticketsChangedDTOCollection = [];
        $ticketsChangedPaginated = $em->getRepository(TicketChange::class)->findPaginated($page, $limit);

        foreach ($ticketsChangedPaginated->items as $ticketChange) {
            $ticketChangeDTO = $objectMapper->map($ticketChange, TicketChangeDTO::class);
            $ticketChangeDTO->customerId = $ticketChange->getTicket()->getCustomer()->getId();
            $ticketChangeDTO->customerFullName = $ticketChange->getTicket()->getCustomer()->getFullName();
            $ticketChangeDTO->customerAvatarImageUrl = $ticketChange->getTicket()->getCustomer()->getAvatarImageUrl();

            $ticketsChangedDTOCollection[] = $ticketChangeDTO;
        }

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = $ticketsChangedDTOCollection;
        $paginationDTO->totalItems = $ticketsChangedPaginated->totalItems;
        $paginationDTO->page = $page;
        $paginationDTO->totalPages = $ticketsChangedPaginated->totalPages;

        return $this->json($paginationDTO);
    }

    private function indexCancelled($page, $limit, EntityManagerInterface $em, ObjectMapperInterface $objectMapper): JsonResponse
    {
        $ticketsCancelledDTOCollection = [];
        $ticketsCancelledPaginated = $em->getRepository(TicketCancellation::class)->findPaginated($page, $limit);

        foreach ($ticketsCancelledPaginated->items as $ticketCancellation) {
            $ticketCancellationDTO = $objectMapper->map($ticketCancellation, TicketCancellationDTO::class);
            $ticketCancellationDTO->customerId = $ticketCancellation->getTicket()->getCustomer()->getId();
            $ticketCancellationDTO->customerFullName = $ticketCancellation->getTicket()->getCustomer()->getFullName();
            $ticketCancellationDTO->customerAvatarImageUrl = $ticketCancellation->getTicket()->getCustomer()->getAvatarImageUrl();

            $ticketsCancelledDTOCollection[] = $ticketCancellationDTO;
        }

        $paginationDTO = new PaginationDTO();
        $paginationDTO->items = $ticketsCancelledDTOCollection;
        $paginationDTO->totalItems = $ticketsCancelledPaginated->totalItems;
        $paginationDTO->page = $page;
        $paginationDTO->totalPages = $ticketsCancelledPaginated->totalPages;

        return $this->json($paginationDTO);
    }
}
