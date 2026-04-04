<?php

namespace App\Entity;

use App\Repository\TicketRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;

#[ORM\Entity(repositoryClass: TicketRepository::class)]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'tickets')]
    #[ORM\JoinColumn(name: 'customer_id', nullable: false)]
    private ?Customer $customer = null;

    #[ORM\Column(name: 'ticket_number')]
    private ?int $ticketNumber = null;

    #[ORM\Column(length: 255)]
    private ?string $airline = null;

    #[ORM\Column(name: 'from_city', length: 255)]
    private ?string $fromCity = null;

    #[ORM\Column(name: 'to_city', length: 255)]
    private ?string $toCity = null;

    #[ORM\Column(name: 'departure_date')]
    private ?\DateTime $departureDate = null;

    #[ORM\Column(name: 'return_date')]
    private ?\DateTime $returnDate = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column]
    private ?int $status = null;

    #[ORM\Column(name: 'created_at')]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, TicketChange>
     */
    #[ORM\OneToMany(targetEntity: TicketChange::class, mappedBy: 'ticket', orphanRemoval: true)]
    private Collection $ticketChanges;

    #[ORM\OneToOne(mappedBy: 'ticket', cascade: ['persist', 'remove'])]
    private ?TicketCancellation $ticketCancellation = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->ticketChanges = new ArrayCollection();
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

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getTicketNumber(): ?int
    {
        return $this->ticketNumber;
    }

    public function setTicketNumber(int $ticketNumber): static
    {
        $this->ticketNumber = $ticketNumber;

        return $this;
    }

    public function getAirline(): ?string
    {
        return $this->airline;
    }

    public function setAirline(string $airline): static
    {
        $this->airline = $airline;

        return $this;
    }

    public function getFromCity(): ?string
    {
        return $this->fromCity;
    }

    public function setFromCity(string $fromCity): static
    {
        $this->fromCity = $fromCity;

        return $this;
    }

    public function getToCity(): ?string
    {
        return $this->toCity;
    }

    public function setToCity(string $toCity): static
    {
        $this->toCity = $toCity;

        return $this;
    }

    public function getDepartureDate(): ?\DateTime
    {
        return $this->departureDate;
    }

    public function setDepartureDate(\DateTime $departureDate): static
    {
        $this->departureDate = $departureDate;

        return $this;
    }

    public function getReturnDate(): ?\DateTime
    {
        return $this->returnDate;
    }

    public function setReturnDate(\DateTime $returnDate): static
    {
        $this->returnDate = $returnDate;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): static
    {
        $this->status = $status;

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

    /**
     * @return Collection<int, TicketChange>
     */
    public function getTicketChanges(): Collection
    {
        return $this->ticketChanges;
    }

    public function addTicketChange(TicketChange $ticketChange): static
    {
        if (!$this->ticketChanges->contains($ticketChange)) {
            $this->ticketChanges->add($ticketChange);
            $ticketChange->setTicket($this);
        }

        return $this;
    }

    public function removeTicketChange(TicketChange $ticketChange): static
    {
        if ($this->ticketChanges->removeElement($ticketChange)) {
            // set the owning side to null (unless already changed)
            if ($ticketChange->getTicket() === $this) {
                $ticketChange->setTicket(null);
            }
        }

        return $this;
    }

    public function getTicketCancellation(): ?TicketCancellation
    {
        return $this->ticketCancellation;
    }

    public function setTicketCancellation(TicketCancellation $ticketCancellation): static
    {
        // set the owning side of the relation if necessary
        if ($ticketCancellation->getTicket() !== $this) {
            $ticketCancellation->setTicket($this);
        }

        $this->ticketCancellation = $ticketCancellation;

        return $this;
    }
}
