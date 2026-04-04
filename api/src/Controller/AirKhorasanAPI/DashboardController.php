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
        SerializerInterface $serializer, 
        ObjectMapperInterface $objectMapper): JsonResponse
    {
        $newCustomers = $em->getRepository(Customer::class)->findNewCustomers();
        
        $latestTicketChanges = $em->getRepository(TicketChange::class)->findLatest();
        $latestTicketCancellations = $em->getRepository(TicketCancellation::class)->findLatest();

        $latestTicketChangeDTOCollection = [];
        $latestTicketCancellationDTOCollection = [];

        foreach ($latestTicketChanges as $ticketChange) {
            $ticketChangeDTO = $objectMapper->map($ticketChange, TicketChangeDTO::class);
            $ticketChangeDTO->ticketId = $ticketChange->getTicket()->getId();
            $ticketChangeDTO->customerId = $ticketChange->getTicket()->getCustomer()->getId();
            $ticketChangeDTO->customerFullName = $ticketChange->getTicket()->getCustomer()->getFullName();
            $ticketChangeDTO->customerAvatarImageUrl = $ticketChange->getTicket()->getCustomer()->getAvatarImageUrl();

            $latestTicketChangeDTOCollection[] = $ticketChangeDTO;
        }

        foreach ($latestTicketCancellations as $ticketCancellation) {
            $cancellationDTO = $objectMapper->map($ticketCancellation, TicketCancellationDTO::class);
            $cancellationDTO->ticketId = $ticketCancellation->getTicket()->getId();
            $cancellationDTO->customerId = $ticketCancellation->getTicket()->getCustomer()->getId();
            $cancellationDTO->customerFullName = $ticketCancellation->getTicket()->getCustomer()->getFullName();
            $cancellationDTO->customerAvatarImageUrl = $ticketCancellation->getTicket()->getCustomer()->getAvatarImageUrl();

            $latestTicketCancellationDTOCollection[] = $cancellationDTO;
        }

        $countMonths = count($newCustomers);
        $thisMonth = $newCustomers[$countMonths - 1]['new_customers'];
        $previousMonth = $newCustomers[$countMonths - 2]['new_customers'];
        $changeInPercentage = $previousMonth > 0 ? (($thisMonth - $previousMonth) / $previousMonth) * 100 : 0;

        $totalCustomers = $em->getRepository(Customer::class)->count([]);

        return $this->json([
            'new_customers' => $newCustomers,
            'total_customers' => $totalCustomers,
            'change_in_percentage' => $changeInPercentage,
            'latest_ticket_changes' => $latestTicketChangeDTOCollection,
            'latest_ticket_cancellations' => $latestTicketCancellationDTOCollection,
        ]);
    }
}
