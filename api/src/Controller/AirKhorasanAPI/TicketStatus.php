<?php

namespace App\Controller\AirKhorasanAPI;

enum TicketStatus: int
{
    case Booked = 0;
    case Changed = 1;
    case Cancelled = 2;
}
