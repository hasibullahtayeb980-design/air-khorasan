<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\Column(unique: true)]
    private ?string $id = null;

    #[ORM\Column(name: "full_name", length: 255)]
    private ?string $fullName = null;

    #[ORM\Column(length: 255)]
    private ?string $phone = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(name: "passport_number")]
    private ?int $passportNumber = null;

    #[ORM\Column(name: "tazkira_number")]
    private ?int $tazkiraNumber = null;

    #[ORM\Column(name: "created_at")]
    private ?\DateTimeImmutable $createdAt = null;

    public function __construct()
    {
        $this->id = Uuid::v4()->toString();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;
        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(string $full_name): static
    {
        $this->fullName = $full_name;
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
}
