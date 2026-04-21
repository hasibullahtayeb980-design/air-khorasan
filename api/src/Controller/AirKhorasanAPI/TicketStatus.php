<?php

namespace App\Controller\AirKhorasanAPI;

enum TicketStatus
{
    case Booked;
    case Changed;
    case Cancelled;
}
