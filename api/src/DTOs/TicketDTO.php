<?php

namespace App\DTOs;

class TicketDTO
{
    public ?int $id = null;
    public ?int $ticketNumber = null;
    public ?int $customerId = null;
    public ?string $customerFullName = null;
    public ?string $customerAvatarImageUrl = null;
    public ?string $airline = null;
    public ?string $fromCity = null;
    public ?string $toCity = null;
    public ?\DateTime $departureDate = null;
    public ?\DateTime $returnDate = null;
    public ?int $price = null;
    public ?int $status = null;
    public ?\DateTimeImmutable $createdAt = null;
}