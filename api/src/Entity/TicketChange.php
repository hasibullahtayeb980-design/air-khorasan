<?php

namespace App\Entity;

use App\Repository\TicketChangeRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Query\Expr\Func;
use DateTimeImmutable;
use Symfony\Component\Serializer\Attribute\MaxDepth;

#[ORM\Entity(repositoryClass: TicketChangeRepository::class)]
class TicketChange
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'ticketChanges')]
    #[ORM\JoinColumn(nullable: false)]
    #[MaxDepth(1)]
    private ?Ticket $ticket = null;

    #[ORM\Column(name: 'change_type')]
    private ?int $changeType = null;

    #[ORM\Column(name: 'old_date')]
    private ?\DateTime $oldDate = null;

    #[ORM\Column(name: 'new_date')]
    private ?\DateTime $newDate = null;

    #[ORM\Column]
    private ?int $fee = null;

    #[ORM\Column(name: 'created_at')]
    private ?\DateTimeImmutable $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

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

    public function setTicket(?Ticket $ticket): static
    {
        $this->ticket = $ticket;

        return $this;
    }

    public function getChangeType(): ?int
    {
        return $this->changeType;
    }

    public function setChangeType(int $changeType): static
    {
        $this->changeType = $changeType;

        return $this;
    }

    public function getOldDate(): ?\DateTime
    {
        return $this->oldDate;
    }

    public function setOldDate(\DateTime $oldDate): static
    {
        $this->oldDate = $oldDate;

        return $this;
    }

    public function getNewDate(): ?\DateTime
    {
        return $this->newDate;
    }

    public function setNewDate(\DateTime $newDate): static
    {
        $this->newDate = $newDate;

        return $this;
    }

    public function getFee(): ?int
    {
        return $this->fee;
    }

    public function setFee(int $fee): static
    {
        $this->fee = $fee;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
