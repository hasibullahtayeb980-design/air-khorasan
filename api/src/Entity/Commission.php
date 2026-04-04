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

    /**
     * @var Collection<int, Visa>
     */
    #[ORM\OneToMany(targetEntity: Visa::class, mappedBy: 'commission')]
    private Collection $visa;

    #[ORM\Column]
    private ?int $amount = null;

    #[ORM\Column]
    private ?\DateTime $date = null;

    public function __construct()
    {
        $this->visa = new ArrayCollection();
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

    public function getPartnerCompany(): ?string
    {
        return $this->partnerCompany;
    }

    public function setPartnerCompany(string $partnerCompany): static
    {
        $this->partnerCompany = $partnerCompany;

        return $this;
    }

    /**
     * @return Collection<int, Visa>
     */
    public function getVisa(): Collection
    {
        return $this->visa;
    }

    public function addVisa(Visa $visa): static
    {
        if (!$this->visa->contains($visa)) {
            $this->visa->add($visa);
            $visa->setCommission($this);
        }

        return $this;
    }

    public function removeVisa(Visa $visa): static
    {
        if ($this->visa->removeElement($visa)) {
            // set the owning side to null (unless already changed)
            if ($visa->getCommission() === $this) {
                $visa->setCommission(null);
            }
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
