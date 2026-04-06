<?php

namespace App\Entity;

use App\Repository\VisaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisaRepository::class)]
class Visa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'visas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Customer $customer = null;

    #[ORM\Column(length: 255)]
    private ?string $country = null;

    #[ORM\Column(name: 'visa_type')]
    private ?int $visaType = null;

    #[ORM\Column(name: 'application_date')]
    private ?\DateTime $applicationDate = null;

    #[ORM\Column]
    private ?int $status = null;

    #[ORM\Column]
    private ?int $fee = null;

    #[ORM\Column(name: 'company_cost')]
    private ?int $companyCost = null;

    #[ORM\Column]
    private ?int $profit = null;

    #[ORM\ManyToOne(inversedBy: 'visa', cascade: ['persist', 'remove'])]
    private ?Commission $commission = null;

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

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getVisaType(): ?int
    {
        return $this->visaType;
    }

    public function setVisaType(int $visaType): static
    {
        $this->visaType = $visaType;

        return $this;
    }

    public function getApplicationDate(): ?\DateTime
    {
        return $this->applicationDate;
    }

    public function setApplicationDate(\DateTime $applicationDate): static
    {
        $this->applicationDate = $applicationDate;

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

    public function getFee(): ?int
    {
        return $this->fee;
    }

    public function setFee(int $fee): static
    {
        $this->fee = $fee;

        return $this;
    }

    public function getCompanyCost(): ?int
    {
        return $this->companyCost;
    }

    public function setCompanyCost(int $companyCost): static
    {
        $this->companyCost = $companyCost;

        return $this;
    }

    public function getProfit(): ?int
    {
        return $this->profit;
    }

    public function setProfit(int $profit): static
    {
        $this->profit = $profit;

        return $this;
    }

    public function getCommission(): ?Commission
    {
        return $this->commission;
    }

    public function setCommission(?Commission $commission): static
    {
        $this->commission = $commission;

        return $this;
    }
}
