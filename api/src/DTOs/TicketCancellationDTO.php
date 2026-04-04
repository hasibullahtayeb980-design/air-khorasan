<?php

namespace App\DTOs;

class TicketCancellationDTO
{
    public ?int $id = null;
    public ?int $ticketId = null;
    public ?int $customerId = null;
    public ?string $customerFullName = null;
    public ?string $customerAvatarImageUrl = null;
    public ?\DateTime $cancellationDate = null;
    public ?int $refundAmount = null;
    public ?int $penalty = null;
}