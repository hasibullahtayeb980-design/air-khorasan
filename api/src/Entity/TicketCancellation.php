<?php

namespace App\Entity;

use App\Repository\TicketCancellationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\MaxDepth;

#[ORM\Entity(repositoryClass: TicketCancellationRepository::class)]
class TicketCancellation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'ticketCancellation', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    private ?Ticket $ticket = null;

    #[ORM\Column(name: 'cancellation_date')]
    private ?\DateTime $cancellationDate = null;

    #[ORM\Column(name: 'refund_amount')]
    private ?int $refundAmount = null;

    #[ORM\Column(name: 'penalty')]
    private ?int $penalty = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getTicket(): ?Ticket
    {
        return $this->ticket;
    }

    public function setTicket(Ticket $ticket): static
    {
        $this->ticket = $ticket;

        return $this;
    }

    public function getCancellationDate(): ?\DateTime
    {
        return $this->cancellationDate;
    }

    public function setCancellationDate(\DateTime $cancellationDate): static
    {
        $this->cancellationDate = $cancellationDate;

        return $this;
    }

    public function getRefundAmount(): ?int
    {
        return $this->refundAmount;
    }

    public function setRefundAmount(int $refundAmount): static
    {
        $this->refundAmount = $refundAmount;

        return $this;
    }

    public function getPenalty(): ?int
    {
        return $this->penalty;
    }

    public function setPenalty(int $penalty): static
    {
        $this->penalty = $penalty;

        return $this;
    }
}
