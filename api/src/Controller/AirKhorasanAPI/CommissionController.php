<?php

namespace App\Controller\AirKhorasanAPI;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class CommissionController extends AbstractController
{
    #[Route('/air/khorasan/a/p/i/commission', name: 'app_air_khorasan_a_p_i_commission')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AirKhorasanAPI/CommissionController.php',
        ]);
    }
}
