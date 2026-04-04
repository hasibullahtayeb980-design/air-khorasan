<?php

namespace App\DTOs;

class VisaDTO
{
    public ?int $id = null;
    public ?int $commissionId = null;
    public ?int $customerId = null;
    public ?string $customerFullName = null;
    public ?string $customerAvatarImageUrl = null;
    public ?string $country = null;
    public ?int $visaType = null;
    public ?\DateTime $applicationDate = null;
    public ?int $status = null;
    public ?int $fee = null;
    public ?int $companyCost = null;
    public ?int $profit = null;
}