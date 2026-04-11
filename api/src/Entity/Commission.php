<?php

namespace App\Entity;

use App\Repository\CommissionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommissionRepository::class)]
class Commission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'partner_company', length: 255)]
    private ?string $partnerCompany = null;

    #[ORM\OneToOne(inversedBy: 'commission', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?Visa $visa = null;

    #[ORM\Column]
    private ?int $amount = null;

    #[ORM\Column]
    private ?\DateTime $date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getPartnerCompany(): ?string
    {
        return $this->partnerCompany;
    }

    public function setPartnerCompany(string $partnerCompany): static
    {
        $this->partnerCompany = $partnerCompany;

        return $this;
    }

    public function getVisa(): ?Visa
    {
        return $this->visa;
    }

    public function setVisa(Visa $visa): static
    {
        $this->visa = $visa;

        if ($visa->getCommission() !== $this) {
            $visa->setCommission($this);
        }

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): static
    {
        $this->date = $date;

        return $this;
    }
}
