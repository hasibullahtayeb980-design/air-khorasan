<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Customer;
use App\Entity\Ticket;
use App\Entity\TicketChange;
use App\Entity\TicketCancellation;
use App\DTOs\TicketChangeDTO;
use App\DTOs\TicketCancellationDTO;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Exception\CircularReferenceException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\ObjectMapper\ObjectMapperInterface;

final class DashboardController extends AbstractController
{
    #[Route('/api/dashboard', methods: ['GET'])]
    public function index(
        EntityManagerInterface $em,
        SerializerInterface    $serializer,
        ObjectMapperInterface  $objectMapper): JsonResponse
    {
        $monthlyNewCustomers = $em->getRepository(Customer::class)->findMonthlyNewCustomers();

        $latestTicketChangeDTOCollection = $this->getLatestTicketChangeDTOs($em, $objectMapper);
        $latestTicketCancellationDTOCollection = $this->getLatestTicketCancellationDTOs($em, $objectMapper);
        $changeInPercentage = $this->calculateMonthlyNewCustomersChangeInPercentage($monthlyNewCustomers);

        $totalCustomers = $em->getRepository(Customer::class)->count([]);
        $totalTickets = $em->getRepository(Ticket::class)->count([]);
        $totalTicketChanges = $em->getRepository(TicketChange::class)->count([]);
        $totalTicketCancellations = $em->getRepository(TicketCancellation::class)->count([]);

        return $this->json([
            'monthlyNewCustomers' => $monthlyNewCustomers,
            'totalCustomers' => $totalCustomers,
            'changeInPercentage' => $changeInPercentage,
            'latestTicketChanges' => $latestTicketChangeDTOCollection,
            'latestTicketCancellations' => $latestTicketCancellationDTOCollection,
            'totalTicketChanges' => $totalTicketChanges,
            'totalTicketCancellations' => $totalTicketCancellations,
            'totalTickets' => $totalTickets,
        ]);
    }

    private function getLatestTicketChangeDTOs(EntityManagerInterface $em, ObjectMapperInterface $objectMapper): array
    {
        $latestTicketChanges = $em->getRepository(TicketChange::class)->findLatest();
        $latestTicketChangeDTOs = [];

        foreach ($latestTicketChanges as $ticketChange) {
            $ticketChangeDTO = $objectMapper->map($ticketChange, TicketChangeDTO::class);
            $ticketChangeDTO->ticketId = $ticketChange->getTicket()->getId();
            $ticketChangeDTO->customerId = $ticketChange->getTicket()->getCustomer()->getId();
            $ticketChangeDTO->customerFullName = $ticketChange->getTicket()->getCustomer()->getFullName();
            $ticketChangeDTO->customerAvatarImageUrl = $ticketChange->getTicket()->getCustomer()->getAvatarImageUrl();

            $latestTicketChangeDTOs[] = $ticketChangeDTO;
        }

        return $latestTicketChangeDTOs;
    }

    private function getLatestTicketCancellationDTOs(EntityManagerInterface $em, ObjectMapperInterface $objectMapper): array
    {
        $latestTicketCancellations = $em->getRepository(TicketCancellation::class)->findLatest();
        $latestTicketCancellationDTOs = [];

        foreach ($latestTicketCancellations as $ticketCancellation) {
            $cancellationDTO = $objectMapper->map($ticketCancellation, TicketCancellationDTO::class);
            $cancellationDTO->ticketId = $ticketCancellation->getTicket()->getId();
            $cancellationDTO->customerId = $ticketCancellation->getTicket()->getCustomer()->getId();
            $cancellationDTO->customerFullName = $ticketCancellation->getTicket()->getCustomer()->getFullName();
            $cancellationDTO->customerAvatarImageUrl = $ticketCancellation->getTicket()->getCustomer()->getAvatarImageUrl();

            $latestTicketCancellationDTOs[] = $cancellationDTO;
        }

        return $latestTicketCancellationDTOs;
    }

    private function calculateMonthlyNewCustomersChangeInPercentage(array $monthlyNewCustomers): float
    {
        $countMonths = count($monthlyNewCustomers);
        $thisMonth = $monthlyNewCustomers[$countMonths - 1]['new_customers'];
        $previousMonth = $monthlyNewCustomers[$countMonths - 2]['new_customers'];
        $changeInPercentage = $previousMonth > 0 ? (($thisMonth - $previousMonth) / $previousMonth) * 100 : 0;

        return $changeInPercentage;
    }
}
