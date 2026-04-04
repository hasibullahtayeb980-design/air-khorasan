<?php

namespace App\DataFixtures;

use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Uid\Uuid;
use App\Entity\Customer;
use App\Entity\Ticket;
use App\Entity\TicketChange;
use App\Entity\TicketCancellation;
use App\Repository\TicketRepository;
use DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 100; $i++) {
            $customer = new Customer();
            $customer->setFullName($faker->name);
            $customer->setPhone($faker->phoneNumber);
            $customer->setEmail($faker->email);
            $customer->setPassportNumber($faker->numberBetween(1000000, 9999999));
            $customer->setTazkiraNumber($faker->numberBetween(1000000, 9999999));
            $customer->setAvatarImageUrl($faker->imageUrl(200, 200, 'people', true));
            $customer->setCreatedAt(DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-12 months', 'now')));
            $manager->persist($customer);
        }

        $manager->flush();

        $customers = $manager->getRepository(Customer::class)->findAll();

        for ($i = 0; $i < 50; $i++) {
            $ticket = new Ticket();
            $ticket->setCustomer($customers[array_rand($customers)]);
            $ticket->setTicketNumber($faker->numberBetween(100000, 999999));
            $ticket->setAirline($faker->company);
            $ticket->setFromCity($faker->city);
            $ticket->setToCity($faker->city);
            $ticket->setDepartureDate($faker->dateTimeBetween('now', '+1 month'));
            $ticket->setReturnDate($faker->dateTimeBetween('+1 month', '+2 months'));
            $ticket->setPrice($faker->numberBetween(100, 1000));
            $ticket->setStatus($faker->numberBetween(0, 2));
            $manager->persist($ticket);
        }

        $manager->flush();
        $tickets = $manager->getRepository(Ticket::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $ticket = $tickets[array_rand($tickets)];
            $ticketChange = new TicketChange();
            $ticketChange->setTicket($ticket);
            $ticketChange->setChangeType($faker->numberBetween(0, 2));
            $ticketChange->setOldDate(DateTime::createFromImmutable($ticket->getCreatedAt()));
            $ticketChange->setNewDate($faker->dateTimeBetween('+1 month', '+2 months'));
            $ticketChange->setFee($faker->numberBetween(10, 100));
            $manager->persist($ticketChange);
        }

        $manager->flush();

        for ($i = 0; $i < 20; $i++) {
            $ticket = array_pop($tickets);
            $refundAmount = $faker->numberBetween(0, $ticket->getPrice());

            $ticketCancellation = new TicketCancellation();
            $ticketCancellation->setTicket($ticket);
            $ticketCancellation->setCancellationDate($faker->dateTimeBetween('now', '+1 month'));
            $ticketCancellation->setRefundAmount($refundAmount);
            $ticketCancellation->setPenalty($ticket->getPrice() - $refundAmount);
            $manager->persist($ticketCancellation);
        }

        $manager->flush();
    }
}