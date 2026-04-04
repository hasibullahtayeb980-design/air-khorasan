<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use DateTimeImmutable;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'full_name', length: 255)]
    private ?string $fullName = null;

    #[ORM\Column(length: 255)]
    private ?string $phone = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(name: 'passport_number')]
    private ?int $passportNumber = null;

    #[ORM\Column(name: 'tazkira_number')]
    private ?int $tazkiraNumber = null;

    #[ORM\Column(name: 'created_at')]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Ticket>
     */
    #[ORM\OneToMany(targetEntity: Ticket::class, mappedBy: 'customer')]
    private Collection $tickets;

    /**
     * @var Collection<int, Visa>
     */
    #[ORM\OneToMany(targetEntity: Visa::class, mappedBy: 'customer', orphanRemoval: true)]
    private Collection $visas;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatarImageUrl = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();

        $this->tickets = new ArrayCollection();
        $this->visas = new ArrayCollection();
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

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassportNumber(): ?int
    {
        return $this->passportNumber;
    }

    public function setPassportNumber(int $passportNumber): static
    {
        $this->passportNumber = $passportNumber;

        return $this;
    }

    public function getTazkiraNumber(): ?int
    {
        return $this->tazkiraNumber;
    }

    public function setTazkiraNumber(int $tazkiraNumber): static
    {
        $this->tazkiraNumber = $tazkiraNumber;

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
     * @return Collection<int, Ticket>
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    public function addTicket(Ticket $ticket): static
    {
        if (!$this->tickets->contains($ticket)) {
            $this->tickets->add($ticket);
            $ticket->setCustomer($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->tickets->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getCustomer() === $this) {
                $ticket->setCustomer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Visa>
     */
    public function getVisas(): Collection
    {
        return $this->visas;
    }

    public function addVisa(Visa $visa): static
    {
        if (!$this->visas->contains($visa)) {
            $this->visas->add($visa);
            $visa->setCustomer($this);
        }

        return $this;
    }

    public function removeVisa(Visa $visa): static
    {
        if ($this->visas->removeElement($visa)) {
            // set the owning side to null (unless already changed)
            if ($visa->getCustomer() === $this) {
                $visa->setCustomer(null);
            }
        }

        return $this;
    }

    public function getAvatarImageUrl(): ?string
    {
        return $this->avatarImageUrl;
    }

    public function setAvatarImageUrl(?string $avatarImageUrl): static
    {
        $this->avatarImageUrl = $avatarImageUrl;

        return $this;
    }
}
