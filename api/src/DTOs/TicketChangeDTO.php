<?php

namespace App\DTOs;

class TicketChangeDTO
{
    public ?int $id = null;
    public ?int $ticketId = null;
    public ?int $customerId = null;
    public ?string $customerFullName = null;
    public ?string $customerAvatarImageUrl = null;
    public ?int $changeType = null;
    public ?\DateTime $oldDate = null;
    public ?\DateTime $newDate = null;
    public ?int $fee = null;
    public ?\DateTimeImmutable $createdAt = null;
}