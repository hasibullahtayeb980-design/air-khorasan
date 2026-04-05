<?php

namespace App\DTOs;


class CustomerDTO
{
    public ?int $id = null;
    public ?string $fullName = null;
    public ?string $phone = null;
    public ?string $email = null;
    public ?int $passportNumber = null;
    public ?int $tazkiraNumber = null;
    public ?\DateTimeImmutable $createdAt = null;
    public ?string $avatarImageUrl = null;
}