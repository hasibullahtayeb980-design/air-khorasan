<?php

namespace App\DTOs;

class CommissionDTO
{
    public ?int $id = null;
    public ?string $partnerCompany = null;
    public ?int $visaId = null;
    public ?int $amount = null;
    public ?\DateTime $date = null;
}